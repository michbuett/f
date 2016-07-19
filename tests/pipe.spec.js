describe('pipe', function () {
    'use strict';

    var pipe = require('../build/test/pipe');
    var f = function f(x) { return x + ' f'; };
    var g = function g(x) { return x + ' g'; };
    var h = function h(x) { return x + ' h'; };

    it('returns a function', function () {
        expect(typeof pipe(f, g)).toBe('function');
    });

    it('allows all function (left to right)', function () {
        var foobar = pipe(f, g);
        expect(foobar('x')).toBe('x f g');
    });

    it('allows to pipe more than two functions', function () {
        var many = pipe(f, g, h, f, g, h);
        expect(many('x')).toBe('x f g h f g h');
    });

    it('it provides a special toString output for debugging', function () {
        expect(pipe(f, g, h).toString()).toBe('h∘g∘f');
    });
});
