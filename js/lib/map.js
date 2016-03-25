'use strict';

var curry = require('./curry');

// map :: Functor f => (a -> b) -> f a -> f b
module.exports = curry(function (fn, functor) {
  return functor.map(fn);
});
//# sourceMappingURL=map.js.map
