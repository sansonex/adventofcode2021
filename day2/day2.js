const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const lines = content.split('\n');

let horizontal = 0;
let depth = 0;

for (let index = 0; index < lines.length; index++) {
    const currentLine = lines[index].split(' ');
    const positions = parseInt(currentLine[1]);

    switch (currentLine[0]) {
        case "forward":
            horizontal += positions;
            break;

        case "down":
            depth += positions;
            break;

        case "up":
            depth -= positions;
            break;

        default:
            break;
    }
}

console.log(depth);
console.log(horizontal);
console.log(depth * horizontal);
