(function () {
    'use strict';

    var moduleList = ["js/app/app.js","js/lib/compose.js","js/lib/curry.js","js/lib/map.js","js/lib/IO.js","js/lib/f.js"];
    var dependencyMap =  {"js/lib/f.js":{"./compose":"js/lib/compose.js","./curry":"js/lib/curry.js","./map":"js/lib/map.js","./IO":"js/lib/IO.js"},"js/app/app.js":{},"js/lib/compose.js":{},"js/lib/curry.js":{},"js/lib/map.js":{"./curry":"js/lib/curry.js"},"js/lib/IO.js":{"./compose":"js/lib/compose.js"}};
    var sourcePath = '';
    var normalize = function normalize(path,mapping){'use strict';var cleaned = path.replace(/\/+/g,'/').replace(/^(\.\/)?/,'').replace(/\.js\.js$/,'.js');var parts = cleaned.split('/');var result = [];var i,l;for (i = 0,l = parts.length;i < l;i++){var nextPart = parts[i];var lastPart = result[result.length - 1];if (nextPart === '..' && lastPart && lastPart !== '..'){result.pop();}else {result.push(nextPart);}}result = result.join('/');if (mapping && typeof mapping === 'object'){Object.keys(mapping).forEach(function (searchKey){var replacement = mapping[searchKey];var searchExp = new RegExp('^' + searchKey);result = result.replace(searchExp,replacement);});}return result;};
    var pathmap = {"f":"js/lib"};
    var modules = {};
    var onLoad = window.onload || function () {};
    var counter = moduleList.length;
    var currentScriptName = moduleList[0];

    window.module = {
        get exports() {
            return null;
        },

        set exports(exp) {
            modules[currentScriptName] = exp;
        },
    };

    window.require = function (name) {
        var moduleName;

        if (currentScriptName) {
            var dependencies = dependencyMap[currentScriptName];

            moduleName = dependencies[name];
        } else {
            moduleName = normalize(name.replace(/^(\.\/)?(\.\.\/)*/, '') + '.js', pathmap);
        }

        return modules[moduleName];
    };


    window.onload = null; // allow trigger when ready

    moduleList.forEach(function (moduleName, i) {
        var script = document.createElement('script');

        script.dataset.name = moduleName;
        script.src = moduleName;
        script.async = false; // preserve execution order
        script.onload = function () {
            counter--;

            if (counter === 0) {
                currentScriptName = null;
                onLoad();
            } else {
                currentScriptName = moduleList[i + 1];
            }
        };

        document.head.appendChild(script);
    });
}());
