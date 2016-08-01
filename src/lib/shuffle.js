module.exports = require('./curry')((map, fn) => {
    return function (...args) {
        let shuffledArgs = [];

        for (let i = 0, l = args.length; i < l; i++) {
            if (map[i] >= 0) {
                shuffledArgs[map[i]] = args[i];
            }
        }

        return fn.apply(this, shuffledArgs);
    };
});
