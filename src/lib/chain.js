let curry = require('./curry');

// chain :: Monad m => (a -> m b) -> m a -> m b
module.exports = curry((f, m) => m.map(f).join());
