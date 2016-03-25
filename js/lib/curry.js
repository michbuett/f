'use strict';

// curry :: f -> f
module.exports = function curry(f) {
    var partially = function partially(f, buffered) {
        var partiallyApplied = function partiallyApplied() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var currArgs = [].concat(buffered).concat(args);

            if (currArgs.length >= f.length) {
                return f.apply(this, currArgs);
            }

            return partially(f, currArgs);
        };

        // override toString for debugging
        partiallyApplied.toString = function () {
            if (buffered.length === 0) {
                return f.toString();
            }

            var argStr = buffered.reduce(function (str, x) {
                return str + ', ' + JSON.stringify(x);
            });
            var fname = f.name || '[anonymous]';

            return fname + '(' + argStr + ')';
        };

        return partiallyApplied;
    };

    return partially(f, []);
};
//# sourceMappingURL=curry.js.map
