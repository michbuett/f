module.exports = (function () {

    const UUID = 'ad72ce92-1923-40fe-8408-5d2a4976851a';

    const MAP_FN = function (key) { return this._data[key || '']; };

    const MAP_METHODS = [
        ['map', function (fn) {
            let newData = {};

            for (let key in this._data) {
                if (!this._data.hasOwnProperty(key)) {
                    continue;
                }

                newData[key] = fn(this._data[key]);
            }

            return FMap.of(newData);
        }],

        // Monad m => m (m a) -> m a
        ['join', function () {
            let merged = {};
            for (let outerKey in this._data) {
                if (this._data.hasOwnProperty(outerKey)) {
                    let innerData = this._data[outerKey].toJS();

                    for (let innerKey in innerData) {
                        if (innerData.hasOwnProperty(innerKey)) {
                            merged[outerKey + innerKey] = innerData[innerKey];
                        }
                    }
                }
            }

            return FMap.of(merged);
        }],

        ['toJS', function () {
            return this._data;
        }],

        // for debugging
        ['toString', stringify],
        ['toJSON', stringify]
    ];

    let FMap = {
        // Map.of :: a -> Map a
        of: (data) => {
            if (data.constructor !== Object) {
                return FMap.of({ '': data });
            }

            let ctext = { _data: data };
            let newMap = bind(MAP_FN, ctext);

            newMap._data = data;
            newMap._typeId = UUID;

            for (let i = 0, l = MAP_METHODS.length; i < l; i++) {
                let key = MAP_METHODS[i][0];
                let fun = MAP_METHODS[i][1];

                newMap[key] = fun;
            }

            return newMap;
        },

        // Map.is :: a -> Boolean
        is: (any) => any && any._typeId === UUID
    };

    return FMap;

    /** @private */
    function bind(fn, context) {
        return function fMap(key) {
            return fn.call(context, key);
        };
    }

    /** private */
    function stringify() {
        if (this._data.hasOwnProperty('')) {
            return 'Map(' + this._data[''] + ')';
        }

        return 'Map(' + JSON.stringify(this._data) + ')';
    }
}());
