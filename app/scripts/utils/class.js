!function (ctx) {
	ctx.FileUploader = ctx.FileUploader || {};
	var Class = ctx.FileUploader.Class = function () {};
	Class.inherit = Object.create || function(proto) {
		function F() {}
		F.prototype = proto;
		return new F;
	};

	Class.extend = function (props) {
		function Constructor () {
			this.init && this.init.apply(this, arguments);
		}
		Constructor.prototype = Class.inherit(this.prototype);
		Constructor.prototype.constructor = Constructor;
		Constructor.extend = Class.extend;

		copyFunction(props, Constructor.prototype, this.prototype);
		return Constructor;
	};

	function copyFunction (props, targetType, parentType) {
		if(!props) return;

		for(var prop in props) {
			if(typeof props[prop] == 'function'
				&& parentType[prop] == 'function') {
				targetType[prop] = wrap(props[prop], parentType[prop]);
			} else {
				targetType[prop] = props[prop];
			}
		}
	}

	function wrap (method, parentMethod) {
		return function () {
			var backup = this._base;
			this._base = parentMethod;

			try {
				return method.apply(this, arguments);
			} finally {
				this._base = backup;
			}
		};
	}
}(window);