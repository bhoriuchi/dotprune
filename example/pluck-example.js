// Author: Branden Horiuchi <bhoriuchi@gmail.com>
// Description: Example of dotprune at work
//

var dotprune = require('../lib/dotprune');

// define an array of objects to prune
var obj = [
    {
	    id : 1,
	    name : "Jack Shepard",
	    groups : [
	        {
		        id : 1,
		        name : "survivors",
		        station : {
			        id : 2,
			        name : "swan",
			        description: "the swan"
		        }
	        },
	        {
		        id : 2,
		        name : "chosen ones",
		        station : {
			        id : 5,
			        name : "temple",
			        description: "the temple"
		        }
	        }
	    ]
    },
    {
	    id : 3,
	    name : "Ben Linus",
	    groups : [
	        {
		        id : 3,
		        name : "others",
		        station : {
			        id : 20,
			        name : "others camp",
			        description: "the others camp"
		        }
	        }
	    ]
    }
];


var plucked = dotprune.deepPluck(obj, 'groups[station].name');
console.log('------------------');
console.log(plucked);
console.log('------------------');

