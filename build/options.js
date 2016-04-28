'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var options = exports.options = {
    functionMarker: 'i18n',
    elementMarker: 'I18N',
    whitelistedAttributes: {
        a: ['href'],
        img: ['alt'],
        '*': ['title', 'placeholder', 'alt', 'summary', 'i18n-id'],
        'Match': ['when']
    }
};

var whitelist = exports.whitelist = function (wl) {
    var shared = wl['*'];
    return Object.keys(wl).reduce(function (whitelist, name) {
        var attrs = wl[name];
        if (name !== '*') {
            wl[name] = attrs.concat(shared);
        }
        return wl;
    }, { '*': shared });
}(options.whitelistedAttributes);

