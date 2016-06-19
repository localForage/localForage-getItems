import { getSerializerPromise } from './utils';

export function getItemsWebsql(keys/*, callback*/) {
    var localforageInstance = this;
    var promise = new Promise(function(resolve, reject) {
        localforageInstance.ready().then(function() {
            return getSerializerPromise(localforageInstance);
        }).then(function(serializer) {
            var dbInfo = localforageInstance._dbInfo;
            dbInfo.db.transaction(function(t) {

                var queryParts = new Array(keys.length);
                for (var i = 0, len = keys.length; i < len; i++) {
                    queryParts[i] = '?';
                }

                t.executeSql('SELECT * FROM ' + dbInfo.storeName +
                    ' WHERE (key IN (' + queryParts.join(',') + '))', keys,
                    function(t, results) {

                        var result = {};

                        var rows = results.rows;
                        for (var i = 0, len = rows.length; i < len; i++) {
                            var item = rows.item(i);
                            var value = item.value;

                            // Check to see if this is serialized content we need to
                            // unpack.
                            if (value) {
                                value = serializer.deserialize(value);
                            }

                            result[item.key] = value;
                        }

                        resolve(result);
                    },
                    function(t, error) {
                        reject(error);
                    });
            });
        }).catch(reject);
    });
    return promise;
}
