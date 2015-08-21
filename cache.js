var fs = require('fs');
var os = require('os');
var path = require('path');

var FILENAME = path.join(os.tmpdir(), ".jsxlate.json");
var data = {};

function save() {
    fs.writeFileSync(FILENAME, JSON.stringify(data, null, "  "));
}

function load() {
    if (process.env.JSXLATE_DISABLE_CACHE) return;

    if (!fs.existsSync(FILENAME)) return;

    try {
        data = JSON.parse(fs.readFileSync(FILENAME));
    } catch (err) {
        return;
    }
}

function get() {
    return data;
}

load();
var cache = get();

var mtime = function (filename) {
    return +fs.statSync(filename).mtime;
};

module.exports = {
    cache: cache,
    mtime: mtime,
    save: save
};
