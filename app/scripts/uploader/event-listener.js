!function (ctx) {
	ctx.FileUploader = ctx.FileUploader || {};

	var EventListener = ctx.FileUploader.EventListener = ctx.FileUploader.Class.extend({
		off: function (name, callback) {
			var eventListeners = this.events[name];
			var index = eventListeners.indexOf(callback);
			eventListeners[index] = void(0);
		},

		on: function (name, callback) {
			this.events[name].push(callback);
		},

		_fire: function (name) {
			var eventListeners = this.events[name];
			if (!eventListeners) return;
			for (var i = 0; i < eventListeners.length; i++) {
				eventListeners[i](Array.prototype.slice.call(arguments, 0));
			}
		}
	});
}(window);