// compose :: fn... -> fn
module.exports = function compose(f, g) {

    return function (val) {
        return f(g(val));
    };
};
