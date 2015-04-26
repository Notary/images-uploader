!function (ctx) {
	var canvas = document.createElement('canvas');
	var ctx2d = canvas.getContext('2d');

	ctx.FileUploader = ctx.FileUploader || {};

	var isArray = FileUploader.Utils.isArray;

	var ImageManager = ctx.FileUploader.ImageManager = ctx.FileUploader.Class.extend({

		init: function (params) {
			this.maxWidth = params.width || 156;
		},

		/***
		 * Scaling Image or Images
		 * @param images {Image | Array}
		 * @returns {Array}
		 */
		scale: function (images) {
			var self = this;
			if(!isArray(images))
				images = [images];
			var tags = [];
			images.forEach(function (el) {
				var url = self._scale(canvas, ctx, el);
				var img = new Image();
				img.src = url;
				tags.push(img);
			});
			return tags;
		},

		_scale: function (image) {
			var maxWidth = this.maxWidth;
			var percent = (maxWidth / ((image.width || 100) / 100)) / 100;
			var dWidth = image.width * percent;
			var dHeight = image.height * percent;
			canvas.width = ctx2d.width = dWidth;
			canvas.height = ctx2d.height = dHeight;
			ctx2d.clearRect(0, 0, dWidth, dHeight);
			ctx2d.drawImage(image, 0, 0, dWidth, dHeight);
			return canvas.toDataURL();
		}
	});
}(window);