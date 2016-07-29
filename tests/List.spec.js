describe('List', function () {
    'use strict';

    var List = require('../build/test/List');
    var map = require('../build/test/map');
    var compose = require('../build/test/compose');
    var id = require('../build/test/id');
    var join = require('../build/test/join');

    var l = List.of([1, 2, 3]);

    describe('item list', function () {
        it('allows to be transformed into javascript array', function () {
            expect(l.toJS()).toEqual([1, 2, 3]);
        });

        it('allows to read store values using keys', function () {
            expect(l.get(0)).toBe(1);
            expect(l.get(1)).toBe(2);
            expect(l.get(2)).toBe(3);
        });

        it('allows to set new values without mutating the list', function () {
            // excute
            var l1 = l.set(0, 'foo');
            var l2 = l.set([2, undefined, 5, 6]);
            var l3 = l.set(2, undefined, 5, 6);

            // verify
            expect(l.toJS()).toEqual([1, 2, 3]);
            expect(l1.toJS()).toEqual(['foo', 2, 3]);
            expect(l2.toJS()).toEqual([2, 2, 5, 6]);
            expect(l3.toJS()).toEqual([2, 2, 5, 6]);
        });

        it('allows to map list items without mutating the list', function () {
            // prepare

            // excute
            var result = l.map(function (x) { return 2 * x; });

            // verify
            expect(l).not.toBe(result);
            expect(l.toJS()).toEqual([1, 2, 3]);
            expect(result.toJS()).toEqual([2, 4, 6]);
        });
    });

    describe('monadic nature', function () {
        it('is pointed', function () {
            expect(typeof List.of).toBe('function');
            expect(List.of({ foo: 'bar' })).toBeTruthy();
        });

        it('can be flattened using "join"', function () {
            var l1 = List.of([1, 2]);
            var l2 = List.of([3, 4]);
            var ll = List.of([l1, l2]);

            var flatL = ll.join();

            expect(List.is(flatL)).toBeTruthy();
            expect(flatL.toJS()).toEqual([1, 2, 3, 4]);
        });

        it('fullfills the identity laws', function () {
            // id === map(id)
            expect(id(l).toJS()).toEqual(map(id)(l).toJS());

            // compose(join, of) === compose(join, map(of)) === id
            var m1 = compose(join, List.of)(l);
            var m2 = compose(join, map(List.of))(l);

            expect(m1.toJS()).toEqual(l.toJS());
            expect(m2.toJS()).toEqual(l.toJS());
        });

        it('fullfills the composition law', function () {
            // compose(map(f), map(g)) === map(compose(f,  g)
            function f(x) { return 'f(' + x + ')'; }
            function g(x) { return 'g(' + x + ')'; }
            expect(compose(map(f), map(g))(l).toJS()).toEqual(map(compose(f, g))(l).toJS());
        });

        it('fullfills the associativity law', function () {
            // compose(join, map(join)) === compose(join, join);
            var l = List.of({ foo: 1 });
            var mm = List.of(l);
            var mmm = List.of(mm);

            var r1 = compose(join, map(join))(mmm);
            var r2 = compose(join, join)(mmm);

            expect(r1.toJS()).toEqual(r2.toJS());
        });
    });

    describe('debugging', function () {
        it('has a custom string representation (for debugging)', function () {
            expect('FOO=' + List.of([1, 3, 7])).toBe('FOO=List(1,3,7)');
            expect(List.of([null, undefined, [1], {foo: 'bar'}, List.of(1)]).toString()).toBe('List(null,undefined,[1],{"foo":"bar"},List(1))');
        });

        it('has a custom JSON representation', function () {
            expect(JSON.stringify(List.of(List.of(List.of(1))))).toBe('"List(List(List(1)))"');
        });
    });
});
