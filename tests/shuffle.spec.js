describe('shuffle', function () {
    'use strict';

    const shuffle = require('../src/shuffle');
    const fn = (...args) => args.join('-');

    it('allows to shuffle function arguments', function () {
        // prepare
        var shuffledFn1 = shuffle([1, 2, 0], fn);
        var shuffledFn2 = shuffle({2: 0, 1: 1, 0: 2}, fn);

        // execute
        var result1 = fn('foo', 'bar', 'baz');
        var result2 = shuffledFn1('foo', 'bar', 'baz');
        var result3 = shuffledFn2('foo', 'bar', 'baz');

        // verify
        expect(result1).toBe('foo-bar-baz');
        expect(result2).toBe('baz-foo-bar');
        expect(result3).toBe('baz-bar-foo');
    });

    it('is curried', function () {
        expect(shuffle([1, 2])(fn)(1, 2, 3)).toBe(shuffle([1, 2], fn)(1, 2, 3));
    });
});
