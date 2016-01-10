// Author: Branden Horiuchi <bhoriuchi@gmail.com>
// Description: Example of merge at work
//

var dotprune = require('../lib/dotprune');

var target = {
	name: 'John',
	emails: ['john@doe.com'],
	age: 20,
	keys: [1, 2]
};

var source1 = {
	surname: 'Doe',
	emails: ['jdoe@gmail.com', 'johnnyd@hotmail.com'],
	age: 21
};

var source2 = {
	emails: ['j3@live.com', 'john@doe.com'],
	keys: 3
};

dotprune.mergePush(target, source1, source2);

console.log(JSON.stringify(target, null, '  '));

