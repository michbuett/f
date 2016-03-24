let curry = require('./curry');

// map :: Functor f => (a -> b) -> f a -> f b
module.exports = curry((fn, functor) => functor.map(fn));
