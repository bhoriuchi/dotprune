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
	
	
	// simple array value compare
	function contains(list, value) {
		for(var i = 0; i < list.length; i++) {
			if (list[i] === value) {
				return true;
			}
		}
		return false;
	}

	// function to replace circular references
	function circular(obj, value, key, seen) {
		
		// set defaults
		seen  = seen  || [];
		value = value || circularDefault;
		key   = key   || null;
		
		// check if seen contains the object
		if (!contains(seen, obj)) {
			
			// if not push the object
			seen.push(obj);
			
			// if the object is an array, loop through its elements and
			// call circular on each element. use a clone of seen so that
			// a "global" array is not used and the current property only
			// knows about objects in its path
			if (Array.isArray(obj)) {
				_.forEach(obj, function(o, idx) {
					obj[idx] = circular(o, value, key, _.clone(seen));
				});	
			}
			
			// if its not an array but is an object, loop through
			// each property and call circular
			else if (obj && typeof(obj) === 'object') {
				_.forEach(obj, function(o, k) {
					obj[k] = circular(o, value, k, _.clone(seen));
				});
			}
		}
		
		// if the object has been seen, return the replacement value
		else {
			if (typeof(value) === 'function') {
				obj = value(obj, key, _.clone(seen));
			}
			else {
				obj = value;
			}
		}
		return obj;
	}
	
	// return the function
	return {
		circular: circular
	};
};