/// <reference types="localforage" />
/// <reference path="../typings/index.d.ts" />

import { extendPrototype } from 'localforage-getitems';

declare let localForageInstance: LocalForage;

namespace LocalForageObservableTest {

    let localforage: LocalForageWithGetItems = extendPrototype(localForageInstance);

    {
        let itemsPromise: Promise<object> = localforage.getItems();

        itemsPromise.then(promiseResults => {
          let results: LocalForageGetItemsResult = promiseResults;
          Object.keys(results).forEach(key => {
            let itemKey: string = key;
            let itemValue: any = results[key];
            console.log(itemKey, itemValue)
          })
        });
    }

    {
        let itemsPromise: Promise<object> = localforage.getItems(null);

        itemsPromise.then(promiseResults => {
          let results: LocalForageGetItemsResult = promiseResults;
          Object.keys(results).forEach(key => {
            let itemKey: string = key;
            let itemValue: any = results[key];
            console.log(itemKey, itemValue)
          })
        });
    }

    {
        let itemsPromise: Promise<object> = localforage.getItems([
          'a',
          'b',
          'c'
        ]);

        itemsPromise.then(promiseResults => {
          let results: LocalForageGetItemsResult = promiseResults;
          Object.keys(results).forEach(key => {
            let itemKey: string = key;
            let itemValue: any = results[key];
            console.log(itemKey, itemValue)
          })
        });
    }
}
