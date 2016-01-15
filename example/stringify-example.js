// Author: Branden Horiuchi <bhoriuchi@gmail.com>
// Description: Example of merge at work
//

var dotprune = require('../lib/dotprune');

var obj = {
	str: 'string',
	bool: true,
	fn: function(param) {
		console.log(param);
	},
	num: 10,
	o: {
		k: 'val',
		k2: 'val2'
	},
	a: [1,2,3],
	nl: null,
	undef: undefined,
	date: new Date()
};

function replacer(k, v) {
	if (typeof(v) === 'number') {
		return (v * 100);
	}
	return v;
}

console.log(dotprune.stringify(obj, null, '  '));

