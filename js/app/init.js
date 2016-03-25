'use strict';

/* global ace */
window.onload = function () {
    'use strict';

    var editor = ace.edit("editor");
    var demo = require('./js/app/app.js');

    editor.setTheme("ace/theme/down");
    editor.getSession().setMode("ace/mode/javascript");

    demo(editor, document.getElementById('output'));
};
//# sourceMappingURL=init.js.map
