!function (ctx) {
	ctx.FileUploader = ctx.FileUploader || {};

	var Queue = ctx.FileUploader.Queue = FileUploader.EventListener.extend({
		events: {
			'item:fetch': [],
			'empty': []
		},
		_queue: [],
		_curIdx: 0,

		push: function (item) {
			var flag = this._queue.length;
			this._queue.push(item);
			if (!flag) this._fire('item:fetch', {count: this._queue.length - this._curIdx});
		},

		next: function () {
			if (!this._queue.length) return null;
			var item = this._queue[this._curIdx];
			this._queue[this._curIdx++] = null;
			if (this._curIdx === this._queue.length) {
				this._queue = [];
				this._curIdx = 0;
			}
			return item;
		}
	});
}(window);