#! /usr/bin/env node
"use strict";

require('babel-polyfill');

function showHelpAndExit() {
    console.log("Usage: extract-messages [-m EXISTING] [-o OUTPUT] ...FILES/DIRECTORIES");
    console.log("Prints a JSON document with messages in FILES/DIRECTORIES mapped to themselves.");
    console.log("If -m is passed, merges with EXISTING translations.");
    console.log("If -o is passed, writes to OUTPUT instead of stdout.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'moh',
    alias: {m: 'merge', o: 'output', h: 'help'}
});

if (argv._.length === 0 || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var extractFromSource = require('../build/extract').extractFromSource;

var paths = filesFromMixedPaths(argv._);
var messages = {};

paths.forEach(function (path) {
    var source = fs.readFileSync(path, "utf8");
    try {
        var messagesInFile = extractFromSource(source);
    } catch (e) {
        console.error(chalk.bold.red("\nError in file " + path + ":"));
        console.error(e);
        console.error(e.stack);
        process.exit(1);
    }
    messagesInFile.forEach(function (message) {
        messages[message] = message;
    });
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
