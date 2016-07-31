// equals :: Comparable a => a -> b -> Boolean
module.exports = require('./curry')((a, b) => {
    if (typeof a.equals === 'function') {
        return a.equals(b);
    }

    if (a == b) {
        return true;
    }

    return JSON.stringify(a) === JSON.stringify(b);
});
