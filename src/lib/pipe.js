// pipe :: f x -> g -> g f x
module.exports = (function () {
    let compose = require('./compose');
    return (...args) => compose.apply(null, args.reverse());
}());
