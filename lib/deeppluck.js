/**
 * Deep Pluck objects/collections
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */

module.exports = function(env) {
	
	/**
	 * Modified function from
	 * http://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression @ Mathias Bynens 
	 */
	function getMatches(string, regex, index, convertInts) {
		convertInts = (convertInts === true) ? true : false;
		index       = (!index && index !== 0) ? 1 : index;
		var matches = [];
		var match   = regex.exec(string);
		
		while (match) {
			
			var m = match[index];
			
			if (m) {
				
				if (convertInts && !isNaN(m)) {
					m = parseInt(m, 10);
				}
				
				matches.push(m);
			}
			
			match = regex.exec(string);
		}
		return matches;
	}



	/**
	 * recursive function to descend a path and get the path value
	 */
	function deepPluckEx(obj, path, out) {
		
		if (obj.hasOwnProperty(path[0]) ||
				(typeof(path[0]) === 'number' &&
						Array.isArray(obj) &&
						obj.length > path[0])) {
			
			obj = obj[path[0]];
			
			if (path.length === 1) {
				out.push(obj);
			}
			else {
				
				if (Array.isArray(obj) && typeof(path[1]) !== 'number') {
					for(var i = 0; i < obj.length; i++) {
						deepPluckEx(obj[i], path.slice(1), out);
					}
				}
				else {
					deepPluckEx(obj, path.slice(1), out);
				}
			}
		}
	}

	/**
	 * Returns an array of values from the specified path
	 * @param obj
	 * @param path
	 * @returns {Array}
	 */
	function deepPluck(obj, path) {
		var i;
		var rx       = /([\w-_$@!]+)?\[[\'\"]?([\w-_$@!]+)[\'\"]?\]/g;
		var out      = [];
		var fullPath = [];

		
		
		if (!path) {
			if (Array.isArray(obj)) {
				out = obj;
			}
			else {
				out = [obj];
			}
		}
		else {
			
			// split the path
			path = path.split('.');
			
			// expand any array paths
			for (i = 0; i < path.length; i++) {
				if (path[i].indexOf('[') !== -1) {
					fullPath = fullPath.concat(getMatches(path[i], rx, 1));
					fullPath = fullPath.concat(getMatches(path[i], rx, 2, true));
				}
				else {
					fullPath.push(path[i]);
				}
			}
			
			if (Array.isArray(obj)) {
				for (i = 0; i < obj.length; i++) {
					deepPluckEx(obj[i], fullPath, out);
				}
			}
			else {
				deepPluckEx(obj, fullPath, out);
			}
		}
		return out;
	}
	

	// return the function
	return {
		deepPluck: deepPluck
	};
};