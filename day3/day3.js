const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const lines = content.split('\n');

const lineLenght = lines[0].split('').length;

let gama = "";
let epsilon = "";

for (let index = 0; index < lineLenght; index++) {
    let zeroCount = 0;
    let oneCount = 0;

    for (let index2 = 0; index2 < lines.length; index2++) {
        const element = lines[index2].split('')[index];

        if (element == "0")
            zeroCount++;
        else
            oneCount++;
    }

    if (zeroCount > oneCount) {
        gama += "0"
        continue;
    }

    gama += "1"
}

function getepsilon(gama) {
    let result = "";
    for (let index = 0; index < gama.length; index++) {
        const element = gama[index];

        if (element == "0") {
            result += "1";
            continue;
        }

        result += "0";
    }

    return result;
}

console.log(gama);
epsilon = getepsilon(gama);
console.log(epsilon);

console.log(parseInt(gama, 2) * parseInt(epsilon, 2));