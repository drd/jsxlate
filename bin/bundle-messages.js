#! /usr/bin/env node
"use strict";

function showHelpAndExit() {
    console.log("Usage: bundle-messages -t TRANSLATIONS [-o OUTPUT] ...FILES/DIRECTORIES");
    console.log("Prints a JS module with messages in FILES/DIRECTORIES mapped");
    console.log("to render functions.");
    console.log("If -o is passed, writes to OUTPUT instead of stdout.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'toh',
    alias: {t: 'translations', o: 'output', h: 'help'}
});

if (!(argv._.length && argv.t) || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');
var rw = require('rw');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var translateMessagesToBundle = require('../build/translate').default;


var translations = JSON.parse(rw.readFileSync(argv.t, "utf8"));
var files = filesFromMixedPaths(argv._);
var bundle = {};


files.forEach(function (filename) {
    var buffer = fs.readFileSync(filename, "utf8");
    try {
        var translationsForFile = translateMessagesToBundle(buffer, translations);
    } catch (e) {
        console.error(chalk.bold.red("\nError in file " + filename + ":"));
        console.error(e);
        process.exit(1);
    }
    Object.keys(translationsForFile).forEach(function (message) {
        bundle[message] = translationsForFile[message];
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
} else {
    console.log(bundle);
}
