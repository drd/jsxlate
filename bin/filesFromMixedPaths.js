var fs = require('fs');
var path = require('path');
var walk = require('walk');

var jsOrJsxRegex = /^[^.](.+?)\.jsx?$/i;

module.exports = function filesFromMixedPaths(paths) {
    var files = [];
    var directories = [];

    paths.forEach(function(path) {
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

    return files;
};