import localforage from 'localforage';
import { executeCallback } from './utils';
import { getItemsGeneric, getAllItemsUsingIterate } from './getitems-generic';
import { getItemsIndexedDB } from './getitems-indexeddb';
import { getItemsWebsql } from './getitems-websql';

export { getItemsGeneric } from './getitems-generic';

export function localforageGetItems(keys, callback) {
    var localforageInstance = this;

    if (!arguments.length || keys === null) {
        var promise = getAllItemsUsingIterate.call(localforageInstance);
        executeCallback(promise, callback);
        return promise;
    }

    var currentDriver = localforageInstance.driver();
    if (currentDriver === localforageInstance.INDEXEDDB) {
        return getItemsIndexedDB.call(localforageInstance, keys, callback);
    } else if (currentDriver === localforageInstance.WEBSQL) {
        return getItemsWebsql.call(localforageInstance, keys, callback);
    } else {
        return getItemsGeneric.call(localforageInstance, keys, callback);
    }
}


export function extendPrototype(localforage) {
    var localforagePrototype = Object.getPrototypeOf(localforage);
    if (localforagePrototype) {
        localforagePrototype.getItems = localforageGetItems;
        localforagePrototype.getItems.indexedDB = function(){
            return getItemsIndexedDB.apply(this, arguments);
        };
        localforagePrototype.getItems.websql = function(){
            return getItemsWebsql.apply(this, arguments);
        };
        localforagePrototype.getItems.generic = function(){
            return getItemsGeneric.apply(this, arguments);
        };
    }
}

export var extendPrototypeResult = extendPrototype(localforage);
