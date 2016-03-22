// curry :: f -> f
module.exports = function curry(f) {
    let arity = f.length;

    let buffer = [];

    let curryed = function (...args) {
        buffer = buffer.concat(args);

        if (buffer.length >= arity) {
            return f.apply(this, buffer);
        }

        return curryed;
    };

    return curryed;
};
