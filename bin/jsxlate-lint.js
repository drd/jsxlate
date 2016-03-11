#!/usr/bin/env node
"use strict";

var chalk = require('chalk');
var fs = require('fs');

var filesFromMixedPaths = require('./filesFromMixedPaths');
var findUntranslatedStrings = require('../build/lint').default;

function showHelpAndExit() {
    console.log("Usage: jsxlate-lint ...FILES/DIRECTORIES");
    console.log("Looks through FILES/DIRECTORIES for strings which should be wrapped in <I18N> tags.");
    process.exit();
}

var argv = require('minimist')(process.argv.slice(2), {
    string: 'hI',
    alias: {h: 'help', I: 'ignore'}
});

if (argv._.length === 0 || argv.h) {
    showHelpAndExit();
}

var paths = filesFromMixedPaths(argv._, {ignore: argv.I});
paths.forEach(function(path) {
    try {
        var src = fs.readFileSync(path, "utf8");
        var suspiciousStrings = findUntranslatedStrings(src);
        if (suspiciousStrings.length) {
            console.log(chalk.bold.yellow(path + ':'));
            console.log(suspiciousStrings.map(function(node) {
                return node.loc.start.line + ": " + node.value;
            }).join('\n'));
        }
    } catch(e) {
        console.error(chalk.bold.red("\nError in file " + path + ":"));
        console.error(e);
        console.error(e.stack);
        process.exit(1);
    }

})
