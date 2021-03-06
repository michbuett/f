describe('compose', function () {
    'use strict';

    var compose = require('../src/compose');
    var f = function f(x) { return 'f(' + x + ')'; };
    var g = function g(x) { return 'g(' + x + ')'; };
    var h = function h(x) { return 'h(' + x + ')'; };

    it('returns a function', function () {
        expect(typeof compose(f, g)).toBe('function');
    });

    it('allows all function (right to left)', function () {
        var foobar = compose(f, g);
        expect(foobar('x')).toBe('f(g(x))');
    });

    it('allows to compose more than two functions', function () {
        var many = compose(f, g, h, f, g, h);
        expect(many('x')).toBe('f(g(h(f(g(h(x))))))');
    });

    it('it provides a special toString output for debugging', function () {
        expect(compose(f, g, h).toString()).toBe('f∘g∘h');
    });
});
