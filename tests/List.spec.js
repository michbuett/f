describe('List', function () {
    'use strict';

    var List = require('../build/test/List');

    it('is a functor', function () {
        expect(typeof List).toBe('function');
        expect(typeof List.of).toBe('function');
        expect(typeof List.of([]).map).toBe('function');
    });

    it('is a monad', function () {
        expect(typeof List.of([]).map).toBe('function');
        expect(typeof List.of([]).join).toBe('function');
        expect(List.of([1, 2]).join()).toEqual([1, 2]);
    });

    it('allows to map list items without mutating the list', function () {
        // prepare
        var list = List.of([1, 2, 3]);

        // excute
        var result = list.map(function (x) { return 2 * x; });

        // verify
        expect(list).not.toBe(result);
        expect(list.join()).toEqual([1, 2, 3]);
        expect(result.join()).toEqual([2, 4, 6]);
    });

    it('has a custom string representation (for debugging)', function () {
        expect('FOO=' + List.of([1, 3, 7])).toBe('FOO=List([1,3,7])');
    });
});
