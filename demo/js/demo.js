(function (global) {
    'use strict';

    global.Demo = function (editor, outEl) {
        editor.on('change', function (e) {
            outEl.innerHTML = evalContent(editor.getValue());
        });
    };

    function evalContent(code) {
        try {
            /* jshint evil: true */
            return eval(code);
            /* jshint evil: false */
        } catch (e) {
            return e;
        }
    }

}(window));
