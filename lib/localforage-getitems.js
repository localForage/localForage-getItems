import localforage from 'localforage';
import { executeCallback } from './utils';
import { getItemsGeneric, getAllItemsUsingIterate } from './getitems-generic';
import { getItemsIndexedDB } from './getitems-indexeddb';
import { getItemsWebsql } from './getitems-websql';

export { getItemsGeneric } from './getitems-generic';

export function localforageGetItems(keys, callback) {
    var localforageInstance = this;

    var promise;
    if (!arguments.length || keys === null) {
        promise = getAllItemsUsingIterate.apply(localforageInstance);
    } else {
        var currentDriver = localforageInstance.driver();
        if (currentDriver === localforageInstance.INDEXEDDB) {
            promise = getItemsIndexedDB.apply(localforageInstance, arguments);
        } else if (currentDriver === localforageInstance.WEBSQL) {
            promise = getItemsWebsql.apply(localforageInstance, arguments);
        } else {
            promise = getItemsGeneric.apply(localforageInstance, arguments);
        }
    }

    executeCallback(promise, callback);
    return promise;
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
