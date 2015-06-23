#! /usr/bin/env node
"use strict";

function showHelpAndExit() {
    console.log("Usage: extract-messages [-m EXISTING] [-o OUTPUT] ...FILES/DIRECTORIES");
    console.log("Prints a JSON document with messages in FILES/DIRECTORIES mapped to themselves.");
    console.log("If -m is passed, merges with EXISTING translations.")
    console.log("If -o is passed, writes to OUTPUT instead of stdout.")
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'moh',
    alias: {m: 'merge', o: 'output', h: 'help'}
});

if (!argv._.length || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var jsxlate = require('../lib/jsxlate.js');

var files = filesFromMixedPaths(argv._);
var messages = {};

files.forEach(function (filename) {
    var buffer = fs.readFileSync(filename, "utf8");
    try {
        var messagesInFile = jsxlate.extractMessages(buffer);
    } catch (e) {
        console.error(chalk.bold.red("\nError in file " + filename + ":"));
        console.error(jsxlate.errorMessageForError(e));
        process.exit(1);
    }
    messagesInFile.forEach(function (message) {
        messages[message] = message;
    })
});

if (argv.m) {
    var existing = JSON.parse(fs.readFileSync(argv.m, 'utf-8'));
    Object.keys(existing).forEach(function(k) {
        messages[k] = existing[k];
    });
}

var output = JSON.stringify(messages, null, 2);

if (argv.o) {
    fs.writeFileSync(argv.o, output);
} else {
    console.log(output);
}
