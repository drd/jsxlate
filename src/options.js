export const options = {
    functionMarker: 'i18n',
    elementMarker: 'I18N',
    whitelistedAttributes: {
        a:   ['href'],
        img: ['alt'],
        '*': ['title', 'placeholder', 'alt', 'summary', 'i18n-id',],
        'Pluralize': ['on'],
        'Match': ['when'],
    },
};


export const whitelist = (function(wl) {
    const shared = wl['*'];
    return Object.keys(wl).reduce((whitelist, name) => {
        const attrs = wl[name];
        if (name !== '*') {
            wl[name] = attrs.concat(shared);
        }
        return wl;
    }, {'*': shared});
})(options.whitelistedAttributes);
