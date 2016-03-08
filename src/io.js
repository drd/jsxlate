/*
 * output of messages
 *
 * all output functions take an internal format of:
 *
 * {message: [{item}...]}
 *
 * Where each item is in the format:
 * {sourceFile, line, node}
 */


import PO from 'pofile';

import version from './version';


const defaultHeaders = {
    "Project-Id-Version": "PROJECT VERSION",
    "Report-Msgid-Bugs-To": "EMAIL@ADDRESS",
    "POT-Creation-Date": "2016-02-25 13:15-0800",
    "PO-Revision-Date": "YEAR-MO-DA HO:MI+ZONE",
    "Last-Translator": "FULL NAME <EMAIL@ADDRESS>",
    "Language-Team": "LANGUAGE <LL@li.org>",
    "MIME-Version": "1.0",
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Transfer-Encoding": "8bit",
    "Generated-By": `jsxlate ${version()}`,
};


export default {
    json: {
        out(messages) {
            return JSON.stringify(
                Object.keys(messages).reduce((json, msg) => {
                    json[msg] = msg;
                    return json;
                }, {})
            );
        },

        in(json) {
            return JSON.parse(json);
        }
    },

    po: {
        out(messages, {root = process.cwd(), headers = defaultHeaders} = {}) {
            const po = new PO();
            Object.assign(po.headers, headers);
            Object.entries(messages).forEach(([message, items]) => {
                const item = new PO.Item();
                item.msgid = message;
                item.references = items.map(
                    ({sourceFile, line,}) => `${sourceFile.replace(root || '', '')}:${line}`
                );
                po.items.push(item);
            });
            return po.toString();
        },

        in(poFile) {
            return PO.parse(poFile);
        }
    },
};
