'use strict';

module.exports = function () {

    var compose = require('./compose');

    var IO = function IO(fn) {
        this.performIO = fn;
    };

    IO.prototype.map = function IOmap(fn) {
        return new IO(compose(fn, this.performIO));
    };

    IO.prototype.toString = function IO_toString() {
        return 'IO(' + this.performIO() + ')';
    };

    // IO.of :: a -> IO a
    IO.of = function (value) {
        return new IO(function () {
            return value;
        });
    };

    return IO;
}();
//# sourceMappingURL=IO.js.map
