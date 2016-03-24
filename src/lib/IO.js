module.exports = (function () {

    let compose = require('./compose');

    let IO = function IO(fn) {
        this.performIO = fn;
    };

    IO.prototype.map = function IOmap(fn) {
        return new IO(compose(fn, this.performIO));
    };

    IO.prototype.toString = function IO_toString() {
        return 'IO(' + this.performIO() + ')';
    };

    // IO.of :: a -> IO a
    IO.of = value => new IO(() => value);

    return IO;
}());
