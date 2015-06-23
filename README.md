

# dotprune
---
dotprune is a simple tool that allows you to remove all properties from a JavaScript object that are not present in present in an array of properties. dot notation can be used to specify sub properties to keep.

# Install
---
```bash
npm install -g dotprune
```
# Roadmap
---
In the future, dotprune is planned to support the following
* non-destructive prune which will produce a pruned copy of the object instead of pruning the source object
* not-prune which will allow the use of ! allowing for the pruning of only ! properties


# Example

##### JavaScript
```js
var dotprune = require('dotprune');

// define a javascript object with sub-properties
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
    }
];

// call the prune function with the object and an array of properties
var prunedObject = dotprune.prune(obj, ['id', 'name', 'groups.name', 'groups.station.name']);

// format the output and print it to the console
var prettyObject = JSON.stringify(prunedObject, null, '  ');
console.log(prettyObject);

```

##### Output
```js
[
  {
    "id": 1,
    "name": "Jack Shepard",
    "groups": [
      {
        "name": "survivors",
        "station": {
          "name": "swan"
        }
      },
      {
        "name": "chosen ones",
        "station": {
          "name": "temple"
        }
      }
    ]
  }
]
```

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
