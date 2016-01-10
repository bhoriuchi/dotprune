/**
 * Merge JavaScript objects and push or concat any array values
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */
module.exports = function(env) {
	var _ = env.lodash;
	
	
	// does the actual merge operation
	function merge(target, source) {

		// if both objects are arrays, push any values that dont exist
		if (Array.isArray(target)) {
			
			var src = Array.isArray(source) ? source : [source];
			
			_.forEach(src, function(s) {
				if (!_.find(target, s) && !_.contains(target, s)) {
					target.push(s);
				}
			});
			return target;
		}
		else if (_.isObject(target) && _.isObject(source)) {
			_.forEach(source, function(v, k) {
				target[k] = _.has(target, k) ? merge(target[k], v) : v;
			});
			return target;
		}
		else {
			return source;
		}
	}
	
	
	// main merge function
	function mergePush() {
		
		// check that there are at least 2 arguments
		if (arguments.length < 2) {
			throw 'a merge requires a minumum of 2 objects';
		}
		
		// set the target as the first argument
		var target = arguments[0];
		
		// loop through the rest of the arguments and call the merge function
		for (var i = 1; i < arguments.length; i++) {
			merge(target, arguments[i]);
		}
		
		// return the target
		return target;
	}
	
	return {
		mergePush: mergePush
	};
};