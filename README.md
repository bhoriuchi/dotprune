

# ✂ dotprune ✂
---
dotprune is a simple tool that allows you to remove all properties from a JavaScript object that are not present in present in an array of properties. dot notation can be used to specify sub properties to keep or prefix propertied with an ! to keep everything but them. If 
you do not want to alter the original object, a boolean true value can be supplied as the third argument in the prune function.

dotprune can now also replace circular references

* See the **[WIKI](https://github.com/bhoriuchi/dotprune/wiki)** for full documentation
* And the **[Change Log](https://github.com/bhoriuchi/dotprune/wiki/Change-Log)** for what's new

<br>

## Documentation
---
#### `dotprune.prune`( `object`, `fields`, [`perserve`] )

* `object` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the object to prune.
* `fields` [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - Array of paths to keep or not keep. Can use dot notation (i.e. `['!name.value']` or `['name.value', 'name.id']`)
* [`perserve=false`] [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) - Create a pruned copy of the object instead of pruning it in place


#### `dotprune.circular`( `object`, [`replacement`] )

* `object` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the object in which to replace circular references.
* [`replacement="[Circular]"`] [`*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) - The value to use as a replacement. If `replacement` is a function it will be passed the circular object and its return value will be used as the replacement


# Basic Prune Example

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

# Basic Circular Example

##### JavaScript
```js
var dotprune = require('dotprune');

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

```

##### Output
```js
[
  {
    "name": "main",
    "obj1": {
      "name": "main",
      "main": "[CustomCircular]"
    },
    "obj2": "[CustomCircular]"
  },
  {
    "name": "main2",
    "obj": {
      "name": "main",
      "obj1": {
        "name": "main",
        "main": "[CustomCircular]"
      },
      "obj2": "[CustomCircular]"
    }
  }
]
```



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
