// Author: Branden Horiuchi <bhoriuchi@gmail.com>
// Description: Prune JavaScript objects using dot notation
//


// function to do the actual pruning
function pruneObjectEx(obj, schema) {
	
	// make sure that both obj and schema are objects. if they are not
	// this indicates that we are finished in this branch
	if (typeof (obj) === 'object' && typeof (schema) === 'object') {
		
		// get the keys for the current level of the object
		var objKeys    = Object.keys(obj);
		var schemaKeys = Object.keys(schema);
		
		// loop through the keys
		for (var i = 0; i < objKeys.length; i++) {
			
			// if the keys are not in the schema, remove them
			if (schemaKeys.indexOf(objKeys[i]) === -1) {
				delete obj[objKeys[i]];
			}
			
			// if they are, move to the next level down and try to prune
			else {
				obj[objKeys[i]] = pruneObject(obj[objKeys[i]], schema[objKeys[i]]);
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
function pruneObject(obj, schema) {

	if (Array.isArray(obj)) {
		for (var i = 0; i < obj.length; i++) {
			
			obj[i] = pruneObjectEx(obj[i], schema);
		}
	}
	else {
		obj = pruneObjectEx(obj, schema);
	}
	
	return obj;
}


// main function to remove objects 
function prune(obj, props) {
	
	var schema = {};
	props = props || [];
	
	// check for empty props and return the object
	if (props.length === 0) {
		return obj;
	}
	
	
	// first build a schema object for the properties
	// requested with or without dot notation
	for(var i = 0; i < props.length; i++) {
		
		var prop = props[i].split('.');
		var propPath = schema;
		
		for (var j = 0; j < prop.length; j++) {
			
			if (!propPath.hasOwnProperty(prop[j])) {
				propPath[prop[j]] = {};
			}
			propPath = propPath[prop[j]];
		}
	}
	
	// run the recuresive prune operation
	obj = pruneObject(obj, schema);
	
    // return the pruned object
	return obj;
}


module.exports = {
		prune: prune
}