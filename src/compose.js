// compose :: fn... -> fn
module.exports = function compose(...args) {

    return function (val) {
        let result = val;

        for (let i = args.length - 1; i >= 0; i--) {
            result = args[i](result);
        }

        return result;
    };
};
