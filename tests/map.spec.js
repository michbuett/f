describe('map', function () {
    'use strict';

    var map = require('../src/map');

    it('is curried', function () {
        expect(typeof map(function () {})).toBe('function');
    });

    it('applies a function to an functor', function () {
        // prepare
        var functor = { map: jasmine.createSpy('functor.map').and.returnValue('foo') };
        var someFn = jasmine.createSpy('someFn');

        // execute
        var mappedFn = map(someFn);

        // verify
        expect(functor.map).not.toHaveBeenCalled();
        expect(someFn).not.toHaveBeenCalled();
    });
});
