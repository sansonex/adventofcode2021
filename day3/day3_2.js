const fs = require('fs')

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const lines = content.split('\n');
const lineLenght = lines[0].split('').length;

function Run(customArray, bitLeft, bitRight) {
    for (let index = 0; index < lineLenght; index++) {
        let leftBit = 0;
        let rightBit = 0;

        for (let index2 = 0; index2 < customArray.length; index2++) {
            const element = customArray[index2].split('')[index];

            if (element == "0")
                rightBit++;
            else
                leftBit++;
        }

        if (leftBit >= rightBit)
            customArray = customArray.filter(x => x.split('')[index] == bitLeft)
        else
            customArray = customArray.filter(x => x.split('')[index] == bitRight)

        if (customArray.length == 1)
            break;
    }

    return customArray;
}

const oxygen = parseInt(Run([...lines], "1", "0"), 2);
const co2 = parseInt(Run([...lines], "0", "1"), 2);

console.log(oxygen, co2);
console.log(oxygen * co2)

