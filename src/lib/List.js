module.exports = (function () {

    const TYPE_ID = 'cb8a6d4b-01e5-4fe3-bc18-ac5fce6293fb';
    const isArray = Array.isArray;

    class List {

        // List.of :: a -> List a
        static of(items) {
            return isArray(items) ? new List(items) : new List([items]);
        }

        // List.is :: a -> Boolean
        static is(any) {
            return any && any._typeId === TYPE_ID;
        }

        constructor(items) {
            this._items = items;
            this._typeId = TYPE_ID;
        }

        get(index) {
            return this._items[index];
        }

        set(...args) {
            if (args.length === 2 && args[0] >= 0) {
                // OPTION 1
                // call list.set(key, value);

                let [i, value] = args;

                if (this._items[i] === value) {
                    return this;
                } else {
                    let newList = this.toJS();
                    newList[i] = value;

                    return new List(newList);
                }
            }

            if (args.length === 1 && isArray(args[0])) {
                // OPTION 2
                // call list.set([newVa1, newVal2, ...]);

                let newItems = mergeLists(this._items, args[0]);
                return this._items === newItems ? this : new List(newItems);
            }

            // OPTION 3
            // call list.set(newVa1, newVal2, ...);
            let newItems = mergeLists(this._items, args);
            return this._items === newItems ? this : new List(newItems);
        }

        // toJS :: List a -> a
        toJS() {
            return [].concat(this._items);
        }

        // map :: List a -> (a -> b) -> List b
        map(fn) {
            return new List(this._items.map(fn));
        }

        join() {
            return new List(this._items.reduce((result, items) => result.concat(items.toJS()), []));
        }

        // for debugging
        toString() {
            return 'List(' +  this._items.map(item => {
                if (isArray(item)) {
                    return '[' + item + ']';
                }

                if (typeof item === 'undefined') {
                    return 'undefined';
                }

                if (item && item.toString !== Object.prototype.toString) {
                    return item.toString();
                }

                return JSON.stringify(item);
            }).join(',') + ')';
        }

        toJSON() {
            return this.toString();
        }
    }

    return List;

    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE HELPER

    /** @private */
    function mergeLists (list1, list2) {
        let newList = list1;

        for (let i = 0, l = list2.length; i < l; i++) {
            if (typeof list2[i] === 'undefined') {
                continue;
            }

            if (newList[i] !== list2[i]) {
                newList = newList === list1 ? [].concat(list1) : newList;
                newList[i] = list2[i];
            }
        }

        return newList;

    }
}());
