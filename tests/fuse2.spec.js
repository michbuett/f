describe('fuse2', function () {
    'use strict';

    var fuse2 = require('../src/fuse2');

    it('allows to fuse two inputs into one result', function () {
        expect(fuse2((a, b) => a + b, 1, 2)).toBe(3);
    });

    it('is curried', function () {
        expect(fuse2((a, b) => a + b)(1)(2)).toBe(3);
    });
});
