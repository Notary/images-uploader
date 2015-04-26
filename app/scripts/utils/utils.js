!function (ctx) {
	ctx.FileUploader = ctx.FileUploader || {};
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	var Utils = ctx.FileUploader.Utils = {
		isArray: function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},

		isFunction: function (obj) {
			return typeof obj === 'function';
		},

		isPlainObject: function isPlainObject(obj) {
			if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
				return false;

			var has_own_constructor = hasOwn.call(obj, 'constructor');
			var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
			// Not own constructor property must be Object
			if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
				return false;

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			var key;
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

	// extend method, got from https://github.com/justmoon/node-extend
		extend: function () {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && typeof target !== "function") {
				target = {};
			}

			for ( ; i < length; i++ ) {
				// Only deal with non-null/undefined values
				if ( (options = arguments[ i ]) != null ) {
					// Extend the base object
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						// Prevent never-ending loop
						if ( target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && this.isArray(src) ? src : [];

							} else {
								clone = src && this.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = this.extend( deep, clone, copy );

							// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}
	};
}(window);