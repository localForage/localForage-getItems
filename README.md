localForage-getItems
====================
[![npm](https://img.shields.io/npm/dm/localforage-getitems.svg)](https://www.npmjs.com/package/localforage-getitems)  
Adds getItems method to [localForage](https://github.com/mozilla/localForage).

## Requirements

* [localForage](https://github.com/mozilla/localForage) v1.4.0+
  * for earlier versions of localforage, please use the v1.1.x releases

## Installation
`npm i localforage-getitems`

##jsperf links
* [default driver order (indexedDB prefered)](http://jsperf.com/localforage-getitems/3)
* [websql (not for firefox)](http://jsperf.com/localforage-getitems-websql)

## API
Just like `getItem()` but you can pass an array with the keys that need to be retrieved.
```js
var keys = ['asdf','asap','async'];
localforage.getItems(keys).then(function(results) {
  console.log(results);
  // prints:
  // {
  //   asdf: 'asdf value!',
  //   asap: 'asap value!',
  //   async: 'async value!'
  // }

  console.log(results.asdf);
  console.log(results['asdf']);
  console.log(results[keys[0]]);
  // all the above print 'asdf value!'
});
```

Invoking `getItems()` without arguments (or with `null` as the first argument) will retrieve all the items of the current driver instance.
```js
localforage.getItems().then(function(results) { });
// or by using callbacks
localforage.getItems(null, function(results) { });
```
