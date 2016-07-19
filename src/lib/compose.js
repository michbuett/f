// compose :: fn... -> fn
module.exports = function compose(...args) {

    let composed = function (val) {
        let result = val;

        for (let i = args.length - 1; i >= 0; i--) {
            result = args[i](result);
        }

        return result;
    };

    // for debugging
    composed.__name = args.map(fn => fn.__name || fn.name || '[anonymous fn]').join('∘');
    composed.toString = () => {
        return composed.__name;
    };

    return composed;
};
