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
        partiallyApplied.__name = f.name;
        partiallyApplied.toString = function () {
            let fnStr = f.toString();
            let argNames = fnStr.match(/\(.*?\)/)[0].replace('(', '').replace(')', '').split(/\s*,\s*/);

            for (let i = 0, l = buffered.length; i < l; i++) {
                fnStr = fnStr.replace(new RegExp('\\b' + argNames[i] + '\\b', 'g'), toDebugString(buffered[i]));
            }

            return fnStr;
        };

        return partiallyApplied;
    };

    return partially(f, []);

    /** @private */
    function toDebugString(anyThing) {
        if (typeof anyThing === 'function') {
            return getFunctionName(anyThing);
        }

        let str = JSON.stringify(anyThing);

        if (str.length > 15) {
            str = str.substr(0, 12) + '...';
        }

        return str;
    }

    /** @private */
    function getFunctionName(fn) {
        return fn.__name || fn.name || '[anonymous fn]';
    }
};
