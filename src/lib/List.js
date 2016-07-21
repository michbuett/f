module.exports = (function () {

    let List = function List(items) {
        this._items = items;
    };

    // map :: List a -> (a -> b) -> List b
    List.prototype.map = function List_map(fn) {
        return new List(this._items.map(fn));
    };

    List.prototype.toString = function List_toString() {
        return 'List(' + JSON.stringify(this._items) + ')';
    };

    List.prototype.join = function List_join() {
        return this._items;
    };

    // List.of :: a -> List a
    List.of = items => new List(items);

    return List;
}());
