module.exports = (function () {

    let Map = function Map(data) {
        this._data = data;
    };

    // map :: Map a -> (a -> b) -> Map b
    Map.prototype.map = function Map_map(fn) {
        let newData = {};

        for (let key in this._data) {
            if (!this._data.hasOwnProperty(key)) {
                continue;
            }

            newData[key] = fn(this._data[key]);
        }

        return new Map(newData);
    };

    Map.prototype.toString = function Map_toString() {
        return 'Map(' + JSON.stringify(this._data) + ')';
    };

    Map.prototype.join = function Map_join() {
        return this._data;
    };

    // Map.of :: a -> Map a
    Map.of = data => new Map(data);

    return Map;
}());
