import localforage from 'localforage';
import { executeCallback, getItemKeyValue } from './utils';
import { getItemsIndexedDB } from './getitems-indexeddb';
import { getItemsWebsql } from './getitems-websql';

export function getItemsGeneric(keys, callback) {
    var localforageInstance = this;
    var promise = new Promise(function(resolve, reject) {
        var itemPromises = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            itemPromises.push(getItemKeyValue.call(localforageInstance, keys[i]));
        }

        Promise.all(itemPromises).then(function(keyValuePairs) {
            var result = {};
            for (var i = 0, len = keyValuePairs.length; i < len; i++) {
                var keyValuePair = keyValuePairs[i];

                result[keyValuePair.key] = keyValuePair.value;
            }
            resolve(result);
        }).catch(reject);
    });
    executeCallback(promise, callback);
    return promise;
}

export function localforageGetItems(keys, callback) {
    var localforageInstance = this;
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
