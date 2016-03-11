#! /usr/bin/env node
"use strict";

require('babel-polyfill');

function showHelpAndExit() {
    console.log("Usage: extract-messages [-m EXISTING] [-o OUTPUT] [-f FORMAT (po|json)]...FILES/DIRECTORIES");
    console.log("Prints a document (gettext PO format by default) with messages in")
    console.log("FILES/DIRECTORIES mapped to themselves.");
    console.log("If -o is passed, writes to OUTPUT instead of stdout.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: ['ohf'],
    alias: {o: 'output', h: 'help', f: 'format'}
});

if (argv._.length === 0 || argv.h) {
    showHelpAndExit();
}

var chalk = require('chalk');
var fs = require('fs');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var extractFromPaths = require('../build/extract').default;

var output = extractFromPaths(argv._, { outputFormat: argv.f || 'po' });
if (argv.o) {
    fs.writeFileSync(argv.o, output);
} else {
    console.log(output);
}
