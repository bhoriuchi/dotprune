

# ✂ dotprune ✂
---
dotprune is a simple tool that allows you to perform operations on collections of JavaScript objects. Pruning allows you to remove or keep only specific object properties using dot notation. Circular allows you to replace circular references in an object with a default string or user defined value. deepPluck allows you to use dot and array notation to pull values from deeply nested objects and collections.

* See the **[WIKI](https://github.com/bhoriuchi/dotprune/wiki)** for full documentation
* And the **[Change Log](https://github.com/bhoriuchi/dotprune/wiki/Change-Log)** for what's new

<br>

## Documentation
---
#### `dotprune.prune`( `collection`, `fields`, [`perserve`] )

* `collection` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the collection to prune.
* `fields` [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - Array of paths to keep or not keep. Can use dot notation (i.e. `['!name.value']` or `['name.value', 'name.id']`)
* [`perserve=false`] [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) - Create a pruned copy of the object instead of pruning it in place


#### `dotprune.circular`( `collection`, [`replacement`] )

* `collection` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the collection in which to replace circular references.
* [`replacement="[Circular]"`] [`*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) - The value to use as a replacement. If `replacement` is a function it will be passed the circular object and its return value will be used as the replacement


#### `dotprune.deepPluck`( `collection`, `path` )

* `collection` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the collection to perform a deep pluck on.
* `path` [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - A string representation of the path to pluck. Array index and dot notation are supported.

#### `dotprune.mergePush`( `target`, `source`, [`...sourceN`] )

* `target` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the object to merge into.
* `source` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - the object to merge from.
* `sourceN` [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - additional objects to merge from.



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

# Basic deepPluck Example

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

console.log(dotprune.deepPluck(obj, 'groups.name'));
// > [ 'survivors', 'chosen ones' ]

console.log(dotprune.deepPluck(obj, 'groups[0].station.name'));
// > [ 'swan' ]

console.log(dotprune.deepPluck(obj, 'groups[station].name'));
// > [ 'swan', 'temple' ]

```


### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
