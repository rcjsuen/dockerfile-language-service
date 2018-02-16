/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
window.onload = function () {
    var w = window;
    // load Monaco code
    w.require(['vs/editor/editor.main'], function () {
        // load client code
        require('./client');
    });
};
//# sourceMappingURL=main.js.map