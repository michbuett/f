let f = {
    // utility functions
    chain: require('./chain'),
    compose: require('./compose'),
    curry: require('./curry'),
    map: require('./map'),
    pipe: require('./pipe'),

    // types
    IO: require('./IO'),

    global: function () {
        let global = typeof window === 'undefined' ? process : window;
        for (let key in f) {
            if (!f.hasOwnProperty(key) || typeof global[key] !== 'undefined') {
                continue;
            }

            global[key] = f[key];
        }
    }
};

module.exports = f;
