// equals :: Comparable a => a -> b -> Boolean
module.exports = require('./curry')((a, b) => {
    if (a === b) {
        return true;
    }

    if (typeof a.equals === 'function') {
        return a.equals(b);
    }

    return JSON.stringify(a) === JSON.stringify(b);
});
