module.exports = (function () {

    const UUID = 'ad72ce92-1923-40fe-8408-5d2a4976851a';

    const MAP_FN = function (key) {
        if (isHash(this._data)) {
            return this._data[key];
        }
        return this._data;
    };

    const MAP_METHODS = [
        ['map', function (fn) {
            if (!isHash(this._data)) {
                return FMap.of(fn(this._data));
            }

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
            if (!isHash(this._data)) {
                return this._data;
            }

            let merged = {};
            let atTopLevel = true;

            for (let outerKey in this._data) {
                if (this._data.hasOwnProperty(outerKey)) {
                    let innerData = this._data[outerKey];

                    if (FMap.is(innerData)) {
                        atTopLevel = false;
                        merged[outerKey] = innerData(outerKey);
                    } else {
                        merged[outerKey] = innerData;
                    }
                }
            }

            return atTopLevel ? merged : FMap.of(merged);
        }],

        ['chain', function (fn) { return this.map(fn).join(); }],

        ['equals', function (any) { return FMap.equals(any, this); }],

        ['toJS', function () {
            return this._data;
        }],

        // for debugging
        ['toString', stringify],
        ['toJSON', stringify]
    ];

    const FMap = {
        // Map.of :: a -> Map a
        of: (data) => createMap(data),

        // Map.is :: a -> Boolean
        is: (any) => any && any._typeId === UUID,

        // Map.equals :: Map a, Map b => a -> b -> Boolean
        equals: (a, b) => FMap.is(a) && FMap.is(b) && a.toString() === b.toString()
    };

    return FMap;

    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE HELPER

    /** @private */
    function createMap(data) {
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
    }

    /** @private */
    function bind(fn, context) {
        return function fMap(key) {
            return fn.call(context, key);
        };
    }

    /** private */
    function stringify() {
        if (!isHash(this._data)) {
            return 'Map(' + this._data + ')';
        }

        return 'Map(' + JSON.stringify(this._data) + ')';
    }

    /** private */
    function isHash(any) {
        return any && any.constructor === Object;
    }
}());
