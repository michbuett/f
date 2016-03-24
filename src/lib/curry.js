// curry :: f -> f
module.exports = function curry(f) {
    var partially = function (f, buffered) {
        let partiallyApplied = function (...args) {
            let currArgs = [].concat(buffered).concat(args);

            if (currArgs.length >= f.length) {
                return f.apply(this, currArgs);
            }

            return partially(f, currArgs);
        };

        // override toString for debugging
        partiallyApplied.toString = function () {
            if (buffered.length === 0) {
                return f.toString();
            }

            let argStr = buffered.reduce((str, x) => str + ', ' + JSON.stringify(x));
            let fname = f.name || '[anonymous]';

            return `${fname}(${argStr})`;
        };

        return partiallyApplied;
    };

    return partially(f, []);
};
