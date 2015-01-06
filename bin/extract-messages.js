"use strict";

function showHelpAndExit() {
    console.log("Usage: extract-messages [FILES]");
    console.log("Prints a JSON document with messages in FILES mapped to themselves.");    
    console.log("Does not merge with existing translations;");
    console.log("use json(1) --merge for that.");
    process.exit();
}

if (process.argv.length < 3
    || ~process.argv.indexOf("-h")
    || ~process.argv.indexOf("--help")) {
    showHelpAndExit();
}

var fs = require('fs');

require("6to5/register");
var translator = require('../jsx-translator.js');

var files = process.argv.slice(2);
var messages = {};

files.forEach(function (filename) {
    var buffer = fs.readFileSync(filename, "utf8");
    var messagesInFile = translator.extractMessages(buffer);
    messagesInFile.forEach(function (message) {
        messages[message] = message;
    })
});
console.log(JSON.stringify(messages, null, 2));
