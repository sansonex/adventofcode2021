const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}
const content = readFile('./input.txt');
const lines = content.split('\n');

let sum = 0;
for (let index = 1; index < lines.length; index++) {
    if (parseInt(lines[index]) > parseInt(lines[index - 1]))
        sum += 1;
}
