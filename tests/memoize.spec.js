describe('memoize', function () {
    'use strict';

    let memoize = require('../src/memoize');

    it('allows to cache the result of the last call', function () {
        // prepare
        let x = 'foo';
        let f = memoize(function () { return x; });

        let args = ['foo', 'bar', 'baz'];
        let ctxt = {};

        // 1st (initial) call
        let result1 = f.apply(ctxt, args);

        x = 'bar'; // side effect to prove caching

        // 2nd call, same context, same parameter
        let result2 = f.apply(ctxt, args);

        // 3rd call, same context, other parameter length
        let result3 = f.apply(ctxt, args.concat(1));

        x = 'baz'; // side effect to prove caching
        // 4th call, same context, other parameter values
        let result4 = f.apply(ctxt, ['foo', 'bar', 'bam']);

        x = 'bam'; // side effect to prove caching
        // 5th call, other context, same parameter
        let result5 = f.apply({}, args.concat(1));

        // verify
        expect(result1).toBe('foo');
        expect(result2).toBe('foo');
        expect(result3).toBe('bar');
        expect(result4).toBe('baz');
        expect(result5).toBe('bam');
    });
});
