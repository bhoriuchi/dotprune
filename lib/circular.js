/**
 * Remove Circular references from Javascript objects
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */

module.exports = function(env) {
	
	var _               = env.lodash;
	var circularDefault = '[Circular]';
	
	
	function setValue(obj, key, value, seen) {
		if (typeof(value) === 'function') {
			
			var newValue = value(obj[key], seen);
			
			if (newValue !== obj[key]) {
				obj[key] = newValue;
			}
			else {
				obj[key] = circularDefault;
			}
			
		}
		else {
			obj[key] = value;	
		}
		return value;
	}
	
	
	// function to replace circular references
	function replaceCircularEx(obj, seen, value) {
		if (obj && typeof(obj) === 'object' || typeof(obj) === 'function') {
			var keys = Object.keys(obj);
			
			if (obj !== null && (typeof(obj) === 'object' || typeof(obj) === 'function')) {
				seen.push(obj);
			}
			
			for(var i = 0; i < keys.length; i++) {
				
				var key     = keys[i];
				var current = obj[key];

				if (current === obj) {
					return setValue(obj, key, value, seen);
				}
				else if (seen.indexOf(current) !== -1) {
					setValue(obj, key, value, seen);
				}
				else {
					obj[key] = replaceCircularEntry(current, seen, value);
				}
			}	
		}
		return obj;
	}

	// function to handle array elements
	function  replaceCircularEntry(obj, seen, value) {
		if (Array.isArray(obj)) {
			for(var j = 0; j < obj.length; j++) {
				obj[j] = replaceCircularEx(obj[j], _.cloneDeep(seen), value);
			}
		}
		else {
			if (obj && typeof(obj) === 'object') {
				obj = replaceCircularEx(obj, seen, value);
			}
		}
		return obj;
	}


	// entry point for circular
	function replaceCircular(obj, value) {
		value = value || circularDefault;
		return replaceCircularEntry(obj, [], value);
	}
	
	// return the function
	return {
		circular: replaceCircular
	};
};