# @converse/localforage-getitems

This is a fork of `localforage-getitems` which adds support for the `getAll`
function for IndexedDB.

The upstream pull request is here: https://github.com/localForage/localForage-getItems/pull/12

The upstream project appears to be unmaintained and hasn't had any changes in 5
years.

## Requirements

* [localForage](https://github.com/mozilla/localForage) v1.4.0+
  * for earlier versions of localforage, please use the v1.1.x releases

## Installation
`npm i @converse/localforage-getitems`

## jsperf links
* [default driver order (indexedDB prefered)](https://jsperf.com/localforage-getitems-2017/1)
* [websql (not for firefox)](https://jsperf.com/localforage-getitems-websql-2017b/1)

## API

Just like `getItem()` but you can pass an array with the keys that need to be retrieved.

```javascript
const keys = ['asdf','asap','async'];

localforage.getItems(keys).then((results) => {
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

```javascript
localforage.getItems().then((results) => { });

// or by using callbacks
localforage.getItems(null, results) => { });
```
