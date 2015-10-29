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
	
	// function to replace circular references
	function replaceCircularEx(obj, seen, value) {
		if (obj && typeof(obj) === 'object') {
			var keys = Object.keys(obj);
			
			for(var i = 0; i < keys.length; i++) {
				
				var key     = keys[i];
				var current = obj[key];
				
				
				if (seen.indexOf(current) !== -1) {

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
				}
				else {
					if (typeof(current) === 'object') {
						seen.push(obj[key]);
					}
					obj[key] = replaceCircularEntry(obj[key], seen, value);
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