describe('IO', function () {
    'use strict';

    var IO = require('../build/test/IO');

    it('is a functor', function () {
        expect(typeof IO).toBe('function');
        expect(typeof IO.of).toBe('function');
        expect(typeof IO.of('foo').map).toBe('function');
    });

    it('allows to perform IO without side effects', function () {
        // prepare
        var fooIO = IO.of('foo');
        var someFn = jasmine.createSpy('someFn');

        // excute
        var someFnIO = fooIO.map(someFn);

        // verify
        expect(someFnIO instanceof IO).toBeTruthy();
        expect(someFn).not.toHaveBeenCalled();
        someFnIO.performIO();
        expect(someFn).toHaveBeenCalledWith('foo');
    });

    it('has a custom string representation (for debugging)', function () {
        expect('FOO=' + IO.of('foo')).toBe('FOO=IO(foo)');
    });
});
