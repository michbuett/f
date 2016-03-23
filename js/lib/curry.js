"use strict";

// curry :: f -> f
module.exports = function curry(f) {
    var arity = f.length;

    var buffer = [];

    var curryed = function curryed() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        buffer = buffer.concat(args);

        if (buffer.length >= arity) {
            return f.apply(this, buffer);
        }

        return curryed;
    };

    return curryed;
};
//# sourceMappingURL=curry.js.map
