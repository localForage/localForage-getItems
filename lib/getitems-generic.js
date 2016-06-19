import { getItemKeyValue } from './utils';

export function getItemsGeneric(keys/*, callback*/) {
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
    return promise;
}

export function getAllItemsUsingKeys() {
    var localforageInstance = this;
    return localforageInstance.keys().then(function(keys){
        return localforageInstance.getItems(keys);
    });
}

export function getAllItemsUsingKeysParallel() {
    var localforageInstance = this;
    return localforageInstance.keys().then(function(keys){
        var itemPromises = [];
        for (var i = 0, len = keys.length; i < len; i++) {
            itemPromises.push(localforageInstance.getItem(keys[i]));
        }
        return Promise.all(itemPromises);
    });
}

export function getAllItemsUsingIterate() {
    var localforageInstance = this;
    var accumulator = {};
    return localforageInstance.iterate(function(value, key/*, iterationNumber*/) {
        accumulator[key] = value;
    }).then(function() {
        return accumulator;
    });
}
