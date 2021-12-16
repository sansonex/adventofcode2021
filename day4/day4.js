const fs = require('fs');
const internal = require('stream');

function readFile(file) {
    return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const drawedNumbers = content.split('\n\n')[0].trim().split(',');

let boards = [];

for (let index = 1; index < content.split('\n\n').length; index++) {
    const element = content.split('\n\n')[index].replace(/\s+/g, ' ').trim();

    boards.push({
        "id": index - 1,
        "numbers": element,
        "markeds": [],
        "unmarkeds": [],
        "winner": false
    });
}

function Run(board, number) {
    const rows = chunkArrayInGroups(board.numbers.split(' '), 5);

    for (let horizontalIndex = 0; horizontalIndex < rows.length; horizontalIndex++) {
        const row = rows[horizontalIndex];
        for (let verticalIndex = 0; verticalIndex < row.length; verticalIndex++) {
            const col = parseInt(row[verticalIndex].trim());

            if (col == number) {
                board.markeds.push({
                    "col": verticalIndex,
                    "row": horizontalIndex,
                    "number": parseInt(col)
                })

                return;
            }
        }
    }
}

function GetUnmarkedNumbers(board) {
    const rows = chunkArrayInGroups(board.numbers.split(' '), 5);

    for (let horizontalIndex = 0; horizontalIndex < rows.length; horizontalIndex++) {
        const row = rows[horizontalIndex];
        for (let verticalIndex = 0; verticalIndex < row.length; verticalIndex++) {
            const col = row[verticalIndex].trim();
            if (!board.markeds.some(x => x.col == col && x.row == row)) {
                board.unmarkeds.push({
                    "col": verticalIndex,
                    "row": horizontalIndex,
                    "number": parseInt(col)
                })
            }
        }
    }
}

const result = naosei();

function naosei() {
    for (let index = 0; index < drawedNumbers.length; index++) {
        const element = parseInt(drawedNumbers[index]);
        let winner = false;

        boards.forEach(board => {
            Run(board, element);
            checkWinner(board);
            if (board.winner == true) {
                console.log(board)
                console.log(element, 'last number')
                winner = true;
                return;
            }
        });

        if (winner == true) {
            return;
        }
    }

}

function checkWinner(board) {
    for (let index = 0; index < 5; index++) {
        if (board.markeds.filter(x => parseInt(x.col) == index).length == 5 || board.markeds.filter(x => parseInt(x.row) == index).length == 5) {
            board.winner = true;
            var z = board.markeds.filter(x => x.col == index);
            var d = board.markeds.filter(x => x.row == index);
            return;
        }
    }
}

function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
    }
    return myArray;
}