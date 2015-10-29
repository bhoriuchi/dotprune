var dotprune = require('../lib/dotprune');

var main = {
	name: 'main',
	obj1: {
		name: 'main'
	}
};

main.obj1.main = main;
main.obj2 = main;

var main2 = {
	name: 'main2',
	obj: main
};

var obj = dotprune.circular([main, main2], function(obj) {
	return '[CustomCircular]';
});

console.log(JSON.stringify(obj, null, '  '));