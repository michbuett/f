describe('compose', function () {
    'use strict';

    var compose = require('../compose');
    var foo = function (x) { return 'oof' + x + 'foo'; };
    var bar = function (x) { return 'rab' + x + 'bar'; };

    it('returns a function', function () {
        expect(typeof compose(foo, bar)).toBe('function');
    });
});
