!function (ctx) {
	ctx.FileUploader = ctx.FileUploader || {};

	var isOldBrowser = !FileReader || !Worker || !Image;

	var defaultParams = {
		el: null,
		needThumbnail: true,
		oldCallback: null
	};


	var Uploader = ctx.FileUploader.Uploader = FileUploader.EventListener.extend({
		events: {
			'loaded': []
		},

		init: function (params) {
			this.params = ctx.FileUploader.Utils.extend({}, defaultParams, params);
			if(!this.params.el)
				throw 'el can not be undefined';
			if(this.params.needThumbnail)
				this.imageManager = new FileUploader.ImageManager(params.width);

			this.images = [];
			this._attachEvents();
		},

		_attachEvents: function () {
			if(this.params.el) this.params.el.addEventListener('change', this._onFileLoad.bind(this));
		},

		_onFileLoad: function () {
			this.loadFiles();
		},

		loadFiles: function (fileList) {
			var files = fileList || this.el.files;
			var self = this;
			var worker = new Worker('/scripts/uploader/worker-image-loader.js');
			var queue = new FileUploader.Queue();
			for(var i = 0; i < files.length; i++) {
				queue.push(files[i]);
			}

			var images = [];
			worker.onmessage = function (e) {
				var item = null;
				self.images.push(e.data);
				images.push(self._drawImage(e.data));
				if(!(item = queue.next())) {
					var result = this._createResult(images, self.params.needThumbnail ? self.imageManager.scale(images) : []);
					this._fire('loaded', result);
				}
				else {
					worker.postMessage(item);
				}
			};

			worker.postMessage(queue.next());
		},

		_createResult: function (images, thumbnails) {
			var result = [];
			for(var i = 0; i< images.length; i++) {
				result.push({
					image: images[i],
					thumbnails: thumbnails[i]
				});
			}
			return result;
		},

		_drawImage: function (image) {
			var img = new Image();
			img.src = image.url;
			return img;
		}
	});

	var uploader = new Uploader();
}(window);
