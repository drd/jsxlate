"use strict";

function showHelpAndExit() {
    console.log("Usage: transform");
    console.log("Transforms <I18N> nodes for translation. Reads/writes to stdin/out.");
    process.exit();
}

if (process.argv.length != 2
    || ~process.argv.indexOf("-h")
    || ~process.argv.indexOf("--help")) {
    showHelpAndExit();
}

var rw = require('rw');

var translator = require('../lib/jsx-translator.js');


var input = rw.readFileSync("/dev/stdin", "utf8");

try {
    console.log(translator.transformMessageNodes(input));
} catch (e) {
    console.error(translator.errorMessageForError(e));
    process.exit(1);
}
