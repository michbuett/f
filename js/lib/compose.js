"use strict";

// compose :: fn... -> fn
module.exports = function compose() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return function (val) {
        var result = val;

        for (var i = args.length - 1; i >= 0; i--) {
            result = args[i](result);
        }

        return result;
    };
};
//# sourceMappingURL=compose.js.map
