const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const lines = content.split('\n');

