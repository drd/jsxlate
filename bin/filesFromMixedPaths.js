"use strict";

var fs = require('fs');
var path = require('path');
var walk = require('walk');
var expandTilde = require('expand-tilde');
var globToRegExp = require('glob-to-regexp');

var jsOrJsxRegex = /^[^.](.+?)\.jsx?$/i;

function ignoreList(ignores) {
    ignores = ignores || [];
    // minimist, why do you give me two different types
    // depending on the input? :(
    ignores = ignores.split ? ignores.split(',') : ignores;
    return ignores.map(function(i) {
        return globToRegExp(i);
    });
}

function shouldIgnore(path, ignore) {
    return ignore.some(function(i) { return i.test(path); });
}

module.exports = function filesFromMixedPaths(paths, options) {
    options = options || {};
    var files = [];
    var directories = [];
    var ignore = ignoreList(options.ignore);

    paths.forEach(function(path) {
        path = expandTilde(path);
        var lstat = fs.lstatSync(path);
        if (lstat.isDirectory()) {
            directories.push(path);
        } else if (lstat.isFile()) {
            files.push(path);
        }
    });

    directories.forEach(function(dirPath) {
        var options = {
            listeners: {
                directories: function(root, dirStatsArray, next) {
                    next();
                },
                file: function(root, fileStats, next) {
                    if (jsOrJsxRegex.test(fileStats.name)) {
                        files.push(path.join(root, fileStats.name));
                    }
                    next();
                },
                errors: function(root, nodeStatsArray, next) {
                    console.error('Error with', nodeStatsArray);
                    next();
                }
            }
        }
        walk.walkSync(dirPath, options);
    });

    return files.filter(function(path) {
        return !shouldIgnore(path, ignore)
    });
};
