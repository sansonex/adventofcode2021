const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}
const content = readFile('./input.txt');

const lines = content.split('\n');

let sum = 0;

for (let index = 1; index < lines.length - 2; index += 1) {
    let currentWindow = parseInt(lines[index - 1]) + parseInt(lines[index]) + parseInt(lines[index + 1]);
    let nextWindow = parseInt(lines[index]) + parseInt(lines[index + 1]) + parseInt(lines[index + 2]);

    if (nextWindow > currentWindow)
        sum++;
}

console.log(sum);