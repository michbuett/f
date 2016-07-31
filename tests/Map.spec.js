describe('Map', function () {
    'use strict';

    var Map = require('../src/Map');
    var map = require('../src/map');
    var compose = require('../src/compose');
    var id = require('../src/id');
    var join = require('../src/join');

    describe('key value store', function () {
        var m = Map.of({foo: 1, bar: 2, baz: 3});

        it('allows to read store values using keys', function () {
            expect(m('foo')).toBe(1);
            expect(m('bar')).toBe(2);
            expect(m('baz')).toBe(3);
        });

        it('allows to read store values without key', function () {
            expect(Map.of('foo')()).toBe('foo');
        });

        it('allows to be transform into a javascript object', function () {
            expect(m.toJS()).toEqual({foo: 1, bar: 2, baz: 3});
        });

        it('allows to map the item values without mutating the map', function () {
            // prepare
            var map = Map.of({foo: 1, bar: 2, baz: 3});

            // excute
            var result = map.map(function (x) { return 2 * x; });

            // verify
            expect(map).not.toBe(result);
            expect(map.toJS()).toEqual({foo: 1, bar: 2, baz: 3});
            expect(result.toJS()).toEqual({foo: 2, bar: 4, baz: 6});

            expect(map('foo')).toBe(1);
            expect(map('bar')).toBe(2);
            expect(map('baz')).toBe(3);

            expect(result('foo')).toBe(2);
            expect(result('bar')).toBe(4);
            expect(result('baz')).toBe(6);
        });
    });

    describe('functional paradigm', function () {
        var m = Map.of({ foo: 'bar', ping: 'pong' });

        it('is pointed', function () {
            expect(typeof Map.of).toBe('function');
            expect(Map.of({ foo: 'bar' })).toBeTruthy();
        });

        it('can be flattened using "join"', function () {
            var m1 = Map.of({ foo: 'bar' });
            var m2 = Map.of({ ping: 'pong' });
            var mm = Map.of({ map1: m1, map2: m2 });

            var flatM = mm.join();

            expect(Map.is(flatM)).toBeTruthy();
            expect(flatM.toJS()).toEqual({ map1foo: 'bar', map2ping: 'pong' });
        });

        it('fullfills the identity laws', function () {
            // id === map(id)
            expect(id(m).toJS()).toEqual(map(id)(m).toJS());

            // compose(join, of) === compose(join, map(of)) === id
            var m1 = compose(join, Map.of)(m);
            var m2 = compose(join, map(Map.of))(m);

            expect(m1.toJS()).toEqual(m.toJS());
            expect(m2.toJS()).toEqual(m.toJS());
        });

        it('fullfills the composition law', function () {
            // compose(map(f), map(g)) === map(compose(f,  g)
            function f(x) { return 'f(' + x + ')'; }
            function g(x) { return 'g(' + x + ')'; }
            expect(compose(map(f), map(g))(m).toJS()).toEqual(map(compose(f, g))(m).toJS());
        });

        it('fullfills the associativity law', function () {
            // compose(join, map(join)) === compose(join, join);
            var m = Map.of({ foo: 1 });
            var mm = Map.of(m);
            var mmm = Map.of(mm);

            var r1 = compose(join, map(join))(mmm);
            var r2 = compose(join, join)(mmm);

            expect(r1.toJS()).toEqual(r2.toJS());
        });
    });

    describe('debugging', function () {
        it('has a custom string representation', function () {
            expect('FOO=' + Map.of({foo: 'bar'})).toBe('FOO=Map({"foo":"bar"})');
        });


        it('has a custom JSON representation', function () {
            expect(JSON.stringify(Map.of(Map.of(Map.of(1))))).toBe('"Map(Map(Map(1)))"');
        });
    });
});
