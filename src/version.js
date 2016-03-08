import fs from 'fs';


export default function version() {
    return JSON.parse(
        fs.readFileSync(__dirname + '/../package.json', 'utf-8')
    ).version;
}
