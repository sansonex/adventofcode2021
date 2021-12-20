const fs = require('fs');
const internal = require('stream');

function readFile(file) {
  return fs.readFileSync(file, 'utf8')
}

const content = readFile('./input.txt');

const drawnNumbers = content.split('\n\n')[0].trim().split(',');

let boards = [];

for (let index = 1; index < content.split('\n\n').length; index++) {
  const element = content.split('\n\n')[index].replace(/\s+/g, ' ').trim();

  boards.push({
    "id": index - 1,
    "numbers": element,
    "marks": [],
    "unmarked": [],
    "winner": false,
    "score": 0
  });
}

runGame();

function getMarks(board, number) {
  const rows = chunkArrayInGroups(board.numbers.split(' '), 5);

  for (let horizontalIndex = 0; horizontalIndex < rows.length; horizontalIndex++) {
    const row = rows[horizontalIndex];
    for (let verticalIndex = 0; verticalIndex < row.length; verticalIndex++) {
      const col = parseInt(row[verticalIndex].trim());

      if (col == number) {
        board.marks.push({
          "col": verticalIndex,
          "row": horizontalIndex,
          "number": parseInt(col)
        })

        return;
      }
    }
  }
}

function getUnmarkedNumbers(board) {
  const rows = chunkArrayInGroups(board.numbers.split(' '), 5);

  for (let horizontalIndex = 0; horizontalIndex < rows.length; horizontalIndex++) {
    const row = rows[horizontalIndex];
    for (let verticalIndex = 0; verticalIndex < row.length; verticalIndex++) {
      const number = row[verticalIndex];

      if (!board.marks.some(x => x.number == number)) {
        board.unmarked.push({
          "col": verticalIndex,
          "row": horizontalIndex,
          "number": parseInt(number)
        })
      }
    }
  }
}


function runGame() {
  for (let index = 0; index < drawnNumbers.length; index++) {
    const currentNumber = parseInt(drawnNumbers[index]);
    let hasAnyWinner = false;

    boards.forEach(board => {
      getMarks(board, currentNumber);

      if (isWinner(board)) {
        hasAnyWinner = true;
        getUnmarkedNumbers(board);
        calculateScore(board, currentNumber);

        console.log(`Board ${board.id} score: ${board.score}`);
      };
    });

    if (hasAnyWinner == true) {
      return;
    }
  }
}

function calculateScore(board, lastNumber) {
  if (board.winner == true) {
    // sum of unmarked numbers * last number
    board.score = board.unmarked.reduce((acc, curr) => acc + curr.number, 0) * lastNumber;
  }
}

function isWinner(board) {
  for (let index = 0; index < 5; index++) {
    if (hasAColWinner(board, index) || hasARowWinner(board, index)) {
      board.winner = true;
      return true;
    }
  }

  return false;
}

function hasARowWinner(board, index) {
  return board.marks.filter(x => parseInt(x.row) == index).length == 5;
}

function hasAColWinner(board, index) {
  return board.marks.filter(x => parseInt(x.col) == index).length == 5;
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}