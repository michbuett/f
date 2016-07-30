'use strict';

describe('fantasyland combatibility', function () {
    var functorLaws = require('fantasy-land/laws/functor');

    describe('Map', function () {
        var Map = require('../src/Map');
        var x = { foo: 'foo', bar: 'bar' };
        var eq = function eq(m1, m2) {
            return m1.toString() === m2.toString();
        };

        it('is a functor', function () {
            expect(functorLaws.identity(Map.of, eq, x)).toBeTruthy();
        });
    });
});
