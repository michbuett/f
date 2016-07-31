'use strict';

describe('fantasyland combatibility', function () {
    var functorLaws = require('fantasy-land/laws/functor');
    var monadLaws = require('fantasy-land/laws/monad');

    var eq = require('../src/equals');
    var Map = require('../src/Map');

    describe('Map', function () {
        let x = { foo: 'foo', bar: 'bar' };
        let T = Map;

        it('is a functor', function () {
            expect(functorLaws.identity(T.of)(eq)(x)).toBeTruthy();
            expect(functorLaws.composition(T.of)(eq)(x)).toBeTruthy();
        });

        it('is a monad', function () {
            expect(monadLaws.leftIdentity(T)(eq)(x)).toBeTruthy();
            expect(monadLaws.rightIdentity(T)(eq)(x)).toBeTruthy();
        });
    });
});
