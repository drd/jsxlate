#! /usr/bin/env node
"use strict";

require('babel-polyfill');
var generate = require('babel-generator').default;

function showHelpAndExit() {
    console.log("Usage: bundle-messages -t TRANSLATIONS [-o OUTPUT] [-f FORMAT (po|json)] ..FILES/DIRECTORIES");
    console.log("Prints a JS module with messages in FILES/DIRECTORIES mapped");
    console.log("to render functions.");
    console.log("The input format automatically defaults to the file extension (po or json).")
    console.log("Pass -f  to override this behavior.");
    console.log("If -o is passed, writes to OUTPUT instead of stdout.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'tohf',
    alias: {t: 'translations', o: 'output', h: 'help', f: 'format'}
});

if (!(argv._.length && argv.t) || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');
var rw = require('rw');

var io = require('../build/io').default;
var filesFromMixedPaths = require('./filesFromMixedPaths');
var translateMessagesToBundle = require('../build/translate').default;

if (argv.f) {
    var format = argv.f;
} else {
    var fileChunks = argv.t.split('.');
    var format = fileChunks[fileChunks.length - 1];
}

var translations = rw.readFileSync(argv.t, "utf8");
var files = filesFromMixedPaths(argv._);
var bundle = {};
var missing = {};


files.forEach(function (filename) {
    var buffer = fs.readFileSync(filename, "utf8");
    try {
        var translationsForFile = translateMessagesToBundle(buffer, translations, { inputFormat: format });
    } catch (e) {
        console.error(chalk.bold.red("\nError in file " + filename + ":"));
        console.error(e);
        console.error(e.stack);
        e.node && console.error(generate(e.node));
        process.exit(1);
    }
    Object.keys(translationsForFile.bundle).forEach(function (message) {
        bundle[message] = translationsForFile.bundle[message];
    });
    Object.keys(translationsForFile.missing).forEach(function (message) {
        missing[message] = message;
    });
});


var bundleEntries = Object.keys(bundle).map(function (message) {
    return "\n\t" + JSON.stringify(message) + ': ' + bundle[message];
});

var bundle = (
    'var React = require("react");\nmodule.exports = {'
    + bundleEntries
    + '\n};\n'
);

if (argv.o) {
    fs.writeFileSync(argv.o, bundle);
    console.error(chalk.bold.green("Success! Wrote transitions to " + argv.o));
} else {
    console.log(bundle);
}

var missingMessages = Object.keys(missing);
if (missingMessages.length) {
    console.error(chalk.bold.yellow("\nTranslations missing (" + missingMessages.length + "):"));
    console.error('  ' + chalk.yellow(missingMessages.join('\n\n  ')));
}
