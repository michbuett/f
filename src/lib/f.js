let f = {
    // utility functions
    chain: require('./chain'),
    compose: require('./compose'),
    curry: require('./curry'),
    equals: require('./equals'),
    id: require('./id'),
    join: require('./join'),
    map: require('./map'),
    pipe: require('./pipe'),
    shuffle: require('./shuffle'),

    // types
    IO: require('./IO'),
    List: require('./List'),
    FMap: require('./Map'),

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
