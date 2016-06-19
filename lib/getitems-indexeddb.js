import IDBKeyRange from './idbKeyRange';

export function getItemsIndexedDB(keys/*, callback*/) {
    var localforageInstance = this;
    function comparer (a,b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    var promise = new Promise(function(resolve, reject) {
        localforageInstance.ready().then(function() {
            // Thanks https://hacks.mozilla.org/2014/06/breaking-the-borders-of-indexeddb/
            var dbInfo = localforageInstance._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                        .objectStore(dbInfo.storeName);

            var set = keys.sort(comparer);

            var keyRangeValue = IDBKeyRange.bound(keys[0], keys[keys.length - 1], false, false);
            var req = store.openCursor(keyRangeValue);
            var result = {};
            var i = 0;
         
            req.onsuccess = function (/*event*/) {
                var cursor = req.result; // event.target.result;
         
                if (!cursor) {
                    resolve(result);
                    return;
                }
         
                var key = cursor.key;
         
                while (key > set[i]) {
         
                    // The cursor has passed beyond this key. Check next.
                    i++;
         
                    if (i === set.length) {
                        // There is no next. Stop searching.
                        resolve(result);
                        return;
                    }
                }
         
                if (key === set[i]) {
                    // The current cursor value should be included and we should continue
                    // a single step in case next item has the same key or possibly our
                    // next key in set.
                    var value = cursor.value;
                    if (value === undefined) {
                        value = null;
                    }

                    result[key] = value;
                    // onfound(cursor.value);
                    cursor.continue();
                } else {
                    // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                    cursor.continue(set[i]);
                }
            };

            req.onerror = function(/*event*/) {
                reject(req.error);
            };
        }).catch(reject);
    });
    return promise;
}
