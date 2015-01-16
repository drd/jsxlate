"use strict";

function showHelpAndExit() {
    console.log("Usage: translate -t TRANSLATIONS");
    console.log("Given a TRANSLATIONS file (output by extract-messages and");
    console.log("suitably translated), translate JSX from stdin to stdout.");
    process.exit();
}

if (process.argv.length != 4
    || process.argv[2] != "-t"
    || ~process.argv.indexOf("-h")
    || ~process.argv.indexOf("--help")) {
    showHelpAndExit();
}

var rw = require('rw');

require("6to5/register");
var translator = require('../jsx-translator.js');


var translationsFilename = process.argv[3];
var translations = JSON.parse(rw.readFileSync(translationsFilename, "utf8"));

var input = rw.readFileSync("/dev/stdin", "utf8");

try {
    console.log(translator.translateMessages(input, translations));
} catch (e) {
    console.error(translator.errorMessageForError(e));
    process.exit(1);
}
