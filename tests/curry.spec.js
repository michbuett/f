describe('curry', function () {
    'use strict';

    var curry = require('../src/curry');

    it('returns a function', function () {
        expect(typeof curry(function () {})).toBe('function');
    });

    it('allows to apply a function partially', function () {
        var f = curry(function (x, y, z) {
            return 'f(' + x + ', ' + y + ', ' + z + ')';
        });

        expect(f(1)(2)(3)).toBe('f(1, 2, 3)');
        expect(f(1)(2)(4)).toBe('f(1, 2, 4)');
    });
});
