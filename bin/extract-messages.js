#! /usr/bin/env node
"use strict";

require('babel-polyfill');

function showHelpAndExit() {
    console.log("Usage: extract-messages [-m EXISTING] [-o OUTPUT] ...FILES/DIRECTORIES");
    console.log("Prints a JSON document with messages in FILES/DIRECTORIES mapped to themselves.");
    console.log("If -o is passed, writes to OUTPUT instead of stdout.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'oh',
    alias: {o: 'output', h: 'help'}
});

if (argv._.length === 0 || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var extractFromPaths = require('../build/extract').default;

var output = extractFromPaths(argv._);
if (argv.o) {
    fs.writeFileSync(argv.o, output);
} else {
    console.log(output);
}
