'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

describe('args', function () {
    'use strict';

    var args = function args(fn, map) {
        if (typeof fn !== 'function') {
            throw 'Expected function as first argument but got ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn));
        }

        if (!Array.isArray(map)) {
            throw 'Expected array as second argument but got ' + (typeof map === 'undefined' ? 'undefined' : _typeof(map));
        }

        var args = new Array(map.length);

        return function () {
            for (var i = 0, l = map.length; i < l; i++) {
                var index = map[i];

                if (index >= 0) {
                    args[index] = arguments[i];
                }
            }

            return fn.apply(this, args);
        };
    };

    it('returns a function', function () {
        expect(_typeof(args(function () {}, []))).toBe('function');
    });

    it('allows to map function arguments', function () {
        // prepare
        var fn = function fn(a, b, c) {
            return [a, b, c].join('-');
        };
        // var fn = function (...args) { return args.join('-'); };
        var mapped1 = args(fn, [1, 2, 0]);
        var mapped2 = args(fn, [2, 1, 0]);

        // execute
        var result1 = fn('foo', 'bar', 'baz');
        var result2 = mapped1('foo', 'bar', 'baz');
        var result3 = mapped2('foo', 'bar', 'baz');

        // verify
        expect(result1).toBe('foo-bar-baz');
        expect(result2).toBe('baz-foo-bar');
        expect(result3).toBe('baz-bar-foo');
    });
});
//# sourceMappingURL=args.spec.js.map
//# sourceMappingURL=args.spec.js.map
