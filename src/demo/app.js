module.exports = (function () {
    'use strict';

    var Demo = function (editor, outEl) {
        editor.on('change', function () {
            outEl.innerHTML = evalContent(editor.getValue());
        });
    };

    /** @private */
    function evalContent(code) {
        try {
            /* jshint evil: true */
            return formatResult(eval(code));
            /* jshint evil: false */
        } catch (e) {
            return formatError(e);
        }
    }

    /** @private */
    function formatResult(result) {
        if (result && typeof result === 'object' && result.constructor === Object) {
            return '[object]\n\n' + JSON.stringify(result, null, '  ');
        }

        if (Array.isArray(result)) {
            return '[array]\n\n' + JSON.stringify(result);
        }

        return '[' + (typeof result) + ']\n\n' + result;
    }

    /** @private */
    function formatError(e) {
        return e;
    }

    return Demo;

}());
