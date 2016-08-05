// fuse2 :: (a -> b -> c) -> a -> b -> c
module.exports = require('./curry')((f, a, b) => f(a, b));
