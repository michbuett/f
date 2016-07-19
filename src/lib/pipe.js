let compose = require('./compose');

// pipe :: f x -> g -> g f x
module.exports = (...args) => compose.apply(null, args.reverse());
