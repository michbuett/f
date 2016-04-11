describe('chain', function () {
    'use strict';

    var chain = require('../build/test/chain');

    it('allows to chain a function call to a monad', function () {
        // prepare
        var f = function () {};
        var expectedResult = { foo: 'bar' };
        var m = {
            map: jasmine.createSpy('map').and.callFake(function () {
                return {
                    join: function () { return expectedResult; },
                };
            }),
        };

        // execute
        var result = chain(f, m);

        // verify
        expect(result).toBe(expectedResult);
        expect(m.map).toHaveBeenCalledWith(f);
    });

    it('is curried', function () {
        // prepare
        var m = {
            map: jasmine.createSpy('map'),
        };

        // execute
        var result = chain(function () {});

        // verify
        expect(typeof result).toBe('function');
        expect(m.map).not.toHaveBeenCalled();
    });
});
