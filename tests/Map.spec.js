describe('Map', function () {
    'use strict';

    var Map = require('../build/test/Map');

    it('is a functor', function () {
        expect(typeof Map).toBe('function');
        expect(typeof Map.of).toBe('function');
        expect(typeof Map.of({}).map).toBe('function');
    });

    it('is a monad', function () {
        expect(typeof Map.of({}).map).toBe('function');
        expect(typeof Map.of({}).join).toBe('function');
        expect(Map.of({foo: 'bar'}).join()).toEqual({foo: 'bar'});
    });

    it('allows to map the item values without mutating the map', function () {
        // prepare
        var map = Map.of({foo: 1, bar: 2, baz: 3});

        // excute
        var result = map.map(function (x) { return 2 * x; });

        // verify
        expect(map).not.toBe(result);
        expect(map.join()).toEqual({foo: 1, bar: 2, baz: 3});
        expect(result.join()).toEqual({foo: 2, bar: 4, baz: 6});
    });

    it('has a custom string representation (for debugging)', function () {
        expect('FOO=' + Map.of({foo: 'bar'})).toBe('FOO=Map({"foo":"bar"})');
    });
});
