'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* eslint no-console: 0 */
module.exports = function () {
    'use strict';

    var STORAGE_KEY = 'DEMO_CODE';

    var output = '';

    var Demo = function Demo(editor, outEl) {
        ['log', 'warn', 'error'].forEach(function (fname) {
            var orgFn = console[fname];
            console[fname] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                output += formatOutputItem(fname, fname.toUpperCase(), args.map(function (arg) {
                    return formatValue(arg);
                }).join(' '));
                orgFn.apply(console, args);
            };
        });

        var initialCode = localStorage.getItem(STORAGE_KEY);
        if (initialCode) {
            handleCodeChange(initialCode, outEl);
            editor.setValue(initialCode);
            editor.clearSelection();
        }

        editor.focus();

        editor.on('change', function () {
            handleCodeChange(editor.getValue(), outEl);
        });
    };

    return Demo;

    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE HELPER

    /** @private */
    function handleCodeChange(code, outEl) {
        localStorage.setItem(STORAGE_KEY, code);
        outEl.innerHTML = evalContent(code);
    }

    /** @private */
    function evalContent(code) {
        output = '';
        try {
            /* jshint evil: true */
            var result = formatValue(eval(code));
            output += formatOutputItem('result', 'RESULT', result);
            /* jshint evil: false */
        } catch (e) {
            output += formatOutputItem('error', 'ERROR', e);
        }
        return output;
    }

    /** @private */
    function formatValue(result) {
        if (result && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result.constructor === Object) {
            return JSON.stringify(result, null, '  ');
        }

        if (Array.isArray(result)) {
            return JSON.stringify(result);
        }

        return result;
    }

    /** @private */
    function formatOutputItem(type, title, content) {
        return '<div class="output-item ' + type + '"><div class="title">' + title + '</div><div class="content">' + content + '</div></div>';
    }
}();
//# sourceMappingURL=app.js.map
