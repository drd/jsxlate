#! /usr/bin/env node
"use strict";

function showHelpAndExit() {
    console.log("Usage: bundle-messages -t TRANSLATIONS [FILES]");
    console.log("Prints a JS module with messages in FILES mapped to render functions.");
    process.exit();
}

if (process.argv.length < 5
    || process.argv[2] != "-t"
    || ~process.argv.indexOf("-h")
    || ~process.argv.indexOf("--help")) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');
var rw = require('rw');

var translator = require('../lib/jsx-translator.js');

var translationsFilename = process.argv[3];
var translations = JSON.parse(rw.readFileSync(translationsFilename, "utf8"));

var files = process.argv.slice(4);
var bundle = {};

files.forEach(function (filename) {
    var buffer = fs.readFileSync(filename, "utf8");
    try {
        var translationsForFile = translator.translateMessagesToBundle(buffer, translations);
    } catch (e) {
        console.error(chalk.bold.red("\nError in file " + filename + ":"));
        console.error(translator.errorMessageForError(e));
        process.exit(1);
    }
    Object.keys(translationsForFile).forEach(function (message) {
        bundle[message] = translationsForFile[message];
    });
});

var bundleEntries = Object.keys(bundle).map(function (message) {
    return "\n\t" + JSON.stringify(message) + ': ' + bundle[message]
});

console.log('var React = require("react");');
console.log('module.exports = {' + bundleEntries + '\n};\n');
