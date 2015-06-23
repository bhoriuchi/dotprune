// Author: Branden Horiuchi <bhoriuchi@gmail.com>
// Description: Example of dotprune at work
//

var dotprune = require('../lib/prune');

// define an array of objects to prune
var obj = [
    {
    	id: 1,
    	name: "Jack Shepard",
    	groups: [
    	    {
    	    	id: 1,
    	    	name: "survivors",
    	    	station: {
    	    		id: 2,
    	    		name: "swan"
    	    	}
    	    },
    	    {
    	    	id: 2,
    	    	name: "chosen ones",
    	    	station: {
    	    		id: 5,
    	    		name: "temple"
    	    	}
    	    }
    	]
    },
    {
    	id: 3,
    	name: "Ben Linus",
    	groups: [
    	    {
    	    	id: 3,
    	    	name: "others",
    	    	station: {
    	    		id: 20,
    	    		name: "others camp"
    	    	}
    	    }
    	]
    }
];


var prunedObject = dotprune.prune(obj, ['id', 'name', 'groups.name', 'groups.station.name']);
var prettyObject = JSON.stringify(prunedObject, null, '  ');

console.log(prettyObject);
