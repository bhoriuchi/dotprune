/**
 * Prune JavaScript objects using dot notation
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */

module.exports = function(env) {
	
	var _ = env.lodash;
	
	// function to do the actual pruning
	function pruneObjectEx(obj, schema, basic, del, substr) {
		
		// make sure that both obj and schema are objects. if they are not
		// this indicates that we are finished in this branch
		if (typeof (obj) === 'object' &&
				typeof (schema) === 'object' &&
				obj && schema) {
			
			// get the keys for the current level of the object
			var objKeys    = _.keys(obj);
			var schemaKeys = _.keys(schema);
			
			// loop through the keys
			for (var i = 0; i < objKeys.length; i++) {
				
				var key = objKeys[i];
				var str = (substr === '') ? key : substr + '.' + key;
				
				// basic prune
				// if the keys are not in the schema, remove them
				if (basic && !_.has(schema, key)) {
					del.push(str);
					delete obj[key];
				}
				
				// not prune
				// if the keys are in the schema and there are no more levels
				// below it, delete the key
				else if (!basic && _.has(schema, key) && _.keys(schema[key]).length === 0) {
					del.push(str);
					delete obj[key];
				}
				
				// if they are, move to the next level down and try to prune
				else if (_.has(schema, key) && _.keys(schema[key]).length > 0) {
					obj[key] = pruneObject(obj[key], schema[key], basic, del, str);
				}
			}
		}
		
		// return the pruned object
		return obj;
	}


	// entry point for the recursive prune operation
	// basically checks for an array and runs the prune
	// function on each element of the array or if
	// not an array on the object itself
	function pruneObject(obj, schema, basic, del, substr) {

		if (Array.isArray(obj)) {
			for (var i = 0; i < obj.length; i++) {
				
				obj[i] = pruneObjectEx(obj[i], schema, basic, del, substr);
			}
		}
		else {
			obj = pruneObjectEx(obj, schema, basic, del, substr);
		}
		
		return obj;
	}


	// main function to remove objects 
	function prune(obj, props, copy, whatIf) {
		
		var basic  = true;
		var del    = [];
		var schema = {};
		var useObj = obj;
		props      = props || [];
		copy       = (copy === true)   ? true : false;
		whatIf     = (whatIf === true) ? true : false;
		
		// check for empty props and return the object
		if (props.length === 0) {
			return obj;
		}
		
		// if the copy field is set, use a copy of the object
		if (copy || whatIf) {
			useObj = _.cloneDeep(obj);
		}
		
		
		// check for a not prune
		for(var k = 0; k < props.length; k++) {
			
			// make sure each element of the property array is a string
			// if we encounter one that is no, return the object un-pruned
			if (typeof(props[k]) !== 'string') {
				return obj;
			}
			
			// look for objects with a ! as the first character and have
			// at least 1 character after. if found set basic to false
			// which means a not-prune will take place
			if (props[k].length > 1 && props[k].substring(0, 1) === '!') {
				basic = false;
				break;
			}
		}
		
		// now build a schema object for the properties
		// requested with or without dot notation
		for(var i = 0; i < props.length; i++) {
			
			// check if we are doing a not prune, and skip any
			// properties that do not start with a !
			if (!basic && props[i].substring(0, 1) !== '!') {
				continue;
			}
			
			// replace remove the not since we already know that
			// a not prune should take place and split any dot
			// notations into their parts
			var prop = props[i].replace('!', '').split('.');
			var propPath = schema;
			
			// loop through each property and create an object
			// that represents the desired schema
			for (var j = 0; j < prop.length; j++) {
				
				// if the object path doesnt exist, add it
				if (!_.has(propPath, prop[j])) {
					propPath[prop[j]] = {};
				}
				propPath = propPath[prop[j]];
			}
		}
		
		// run the recursive prune operation
		useObj = pruneObject(useObj, schema, basic, del, '');
		
	    // return the pruned object or whatIf array
		if (whatIf === true) {
			return _.unique(del);
		}
		return useObj;
	}
	
	return {
		prune: prune
	};
};