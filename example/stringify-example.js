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
		k2: 'val2',
		fnIndented: function() {
			console.log('indented function');
		},
		o: {
			fnIndented2: function() {
				return '2x';
			}
		}
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

var str = dotprune.stringify(obj, null, '\t');

//console.log(str.replace(/\n/g, '\n\t\t'));
console.log(str);

