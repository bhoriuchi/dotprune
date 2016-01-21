/**
 * Stringify Javascript collection that contains objects like functions
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */
module.exports = function(env) {
	var _     = env.lodash;
	var endRx = /,\n?$/;
	
	function getType(obj) {
		return Object.prototype.toString.call(obj)
		.replace('[object ', '')
		.replace(']', '');
	}
	
	
	// function to do stringification
	function toStr(obj, replacer, space, depth) {
		
		var type   = getType(obj);
		var output = '';
		var ret    = (replacer !== undefined && space) ? '\n' : '';
		
		depth      = depth    || 0;
		space      = space    || '';
		
		var spaces = space.repeat(depth);		
		
		if (type === 'Null') {
			output += 'null,' + ret;
		}
		else if (type === 'Undefined') {
			output += 'undefined,' + ret;
		}
		else if (type === 'Array') {
			output += '[' + ret;
			_.forEach(obj, function(value, idx) {
				if (typeof(replacer) === 'function') {
					value = replacer(idx, value);
				}
				output += [spaces, space, toStr(value, replacer, space, (depth + 1))].join('');
			});
			output = output.replace(endRx, ret);
			output += spaces + '],' + ret;
		}
		else if (type === 'Object') {
			output += '{' + ret;
			_.forEach(obj, function(value, key) {
				if (typeof(replacer) === 'function') {
					value = replacer(key, value);
				}
				output += [spaces, space, '"', key, '":', toStr(value, replacer, space, (depth + 1))].join('');
			});
			output = output.replace(endRx, ret);
			output += spaces + '},' + ret;
		}
		else if (type === 'Function') {
			var o = obj.toString();
			if (replacer === undefined || !space) {
				o = o.replace(/\s+/g, ' ');
			}
			else {
				var fnIndent = o.match('\n[ \t]+');
				
				if (fnIndent) {
					var fnRx = new RegExp(fnIndent[0].replace(/\n/g, '\\n').replace(/\t/g, '\\t'), "g");
					o = o.replace(fnRx, '\n' + spaces + space)
					.replace(/\s+}$/, '\n' + spaces + '}')
					.replace(/\t/g, space);	
				}	
			}
			output += o + ',' + ret;
		}
		else if (type === 'Boolean') {
			output += String(obj) + ',' + ret;
		}
		else if (type === 'Number') {
			output += obj + ',' + ret;
		}
		else {
			output += ['"', String(obj).replace(/"/g, '\\"'), '",', ret].join('');
		}
		
		// return the output
		return output;
	}
	
	
	// main function
	function stringify(obj, replacer, space) {
		
		// call the toStr function on the main object and strip
		// the final return and comma
		var ret   = (replacer === null && space) ? '\n' : '';
		return toStr(obj, replacer, space).replace(endRx, '');
	}
	
	// return the function
	return {
		stringify: stringify
	};
};