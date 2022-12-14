// TO-DO is marked with !#!#!#!
//------------------------------------------------------------------------
//==================INITAL ENVIORMENT SETUP===============================
//------------------------------------------------------------------------
// grid - grid container that holds the game board
// size - game board dimensions (for both dimension X/Y axis)
// counter - turn counter. changes player by binary seletion of counter%2
// !#!#!#!   game will end in a tie when counter = size*size
//------------------------------------------------------------------------
const page = document.querySelector(".page-cover");
const Board3 = document.getElementById('board3');
const Board4 = document.getElementById('board4');
const Board5 = document.getElementById('board5');
const resetbtn = document.querySelector(".reset");
const resetmainbtn = document.querySelector(".resetmain");
const message = document.querySelector("#gamestatus-message");
const playername = document.querySelector(".player-name");
const user = document.querySelector(".player-message");
const grid = document.querySelector(".gridContainer");
// const sizeInput = document.querySelector('input')
let size = 3;
grid.setAttribute(
  "style",
  `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`
  );
// Board3.addEventListener('click', (e)=>{
//   size = 5
//   grid.setAttribute(
//     "style",
//     `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`
//     );
// })
let counter = 0;
let gameBoard = setBoard(size);
// !#!#!#! when setboard called again game board reset but doesnt update display
// setting the CSS Grid board dimension by the "size" parameter
  //creating every grid item - assigning text content of "", assigning class of "grid-item",
  //creating a unique ID, and a unique event listener to EACH of elements
  for (let i = 0; i < size ** 2; i++) {
    let element = document.createElement("div");
    element.innerText = "";
    element.setAttribute("id", i);
    element.setAttribute("class", "grid-item");
    grid.append(element);
    element.addEventListener("click", (e) => {
      console.log(`hi i am ${i}`);
      if (element.innerText === "") {
        inputXO(i);
      }
    });
  }
  const gridItem = document.querySelectorAll('.grid-item')
  resetbtn.addEventListener('click', reset)
  resetmainbtn.addEventListener('click', resetmain)
  //------------------------------------------------------------------------
//=============================TESTS======================================
//------------------------------------------------------------------------
//All the funcions to check win status by scenarios (row/column/both diagonal)
//------------------------------------------------------------------------
//Rows
function checkRows(board) {
  for (let i = 0; i < board.length; i++) {
    let test = board.every((num, j, arr) => {
      return arr[i][0] === arr[i][j] && arr[i][0] !== "";
    });
    if (test) {
      return true;
    }
  }
  return false;
}
//Columns
function checkCols(board) {
  for (let i = 0; i < board.length; i++) {
    let test = board.every((num, j, arr) => {
      return arr[0][i] === arr[j][i] && arr[0][i] !== "";
    });
    if (test) {
      return true;
    }
  }
  return false;
}
//Diagonal L to R
function diagonalLR(board) {
  let test = board.every((num, j, arr) => {
    return arr[0][0] === arr[j][j] && arr[0][0] !== "";
  });
  if (test) {
    return true;
  }
  return false;
}
//Diagonal R to L
function diagonalRL(board) {
  let test = board.every((num, j, arr) => {
    return (
      arr[0][arr.length - 1] === arr[j][arr.length - 1 - j] &&
      arr[0][arr.length - 1] !== ""
    );
  });
  if (test) {
    return true;
  }
  return false;
}
//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
// setBoard - creating the game board array
// turnSwitch - switching the player and the output ("X"/"O") by the counter odd/even
// inputXO - inputing the current value ("X"/"O") to the html and the javascript array
//------------------------------------------------------------------------
function reset() {
  for(let i=0;i<gridItem.length; i++){
      gridItem[i].innerText = ''
  }
  gameBoard=setBoard(size)
  counter = 0
  page.classList.toggle('hidden')
}
function resetmain() {
  for(let i=0;i<gridItem.length; i++){
      gridItem[i].innerText = ''
  }
  resetbtn.innerText = 'OK'
  gameBoard=setBoard(size)
  counter = 0
  page.classList.toggle('hidden')
  user.textContent = `Board Reseted`
}
function setBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }
  return board;
}
function turnSwitch(count) {
  counter += 1;
  console.log("turnSwitch", count);
  return count % 2 === 0 ? "X" : "O";
}
function inputXO(i) {
  let cell = document.getElementById(`${i}`);
  let player = turnSwitch(counter);
  cell.innerText = player;
  if (cell.innerText !== "") {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        if (j * size + k === i) {
          gameBoard[j][k] = player;
        }
      }
    }
    playername.innerText = `${player}`
    if (winStatus(gameBoard)) {
      user.textContent = `Player ${player} Won!!!`
      page.classList.toggle('hidden')
      console.log('WIN');
    } else if (!winStatus(gameBoard) && counter === size**2) {
    user.textContent = `Its a Tie!`
    page.classList.toggle('hidden')
    console.log('Its a Tie!');
    }
  }
  // !!!REMOVE LATER!!!
  console.log(`inside inputXO i=${i} counter = ${counter}`);
}
//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
// winStatus - sending the gamrboard to all the tests
// !#!#!#! display winner
// !#!#!#! display tie
// !#!#!#! add reset button
// !#!#!#! give multiple board size option
//------------------------------------------------------------------------
function winStatus(board) {
  const tests = [checkRows, checkCols, diagonalLR, diagonalRL];
  let isWin = false;
  for (let i = 0; i < tests.length; i++) {
    if (tests[i](board)) {
      isWin = true;
      break;
    }
  }
  return isWin;
}
//------------------------------------------------------------------------
//=============================IN PROGRESS================================
//------------------------------------------------------------------------
// arrTest[size][win-direction]
//------------------------------------------------------------------------
let arrTest3Row = [
  ["", "O", ""],
  ["X", "X", "X"],
  ["", "", "O"],
];
let arrTest3Col = [
  ["0", "X", ""],
  ["", "X", "0"],
  ["", "X", ""],
];
let arrTest3DiagLR = [
  ["O", "X", "O"],
  ["", "O", ""],
  ["X", "", "O"],
];
let arrTes3tDiagRL = [
  ["O", "", "X"],
  ["X", "X", ""],
  ["X", "", "O"],
];
let arrTest3NoWin = [
  ["X", "O", "O"],
  ["O", "O", "X"],
  ["X", "X", "O"],
];
let arrTest44 = [
  [1, 2, 1, 1],
  [0, 0, 0, 1],
  [5, 1, 5, 1],
  [1, 1, 1, 1],
];

// console.log(winStatus(arrTest3Row));
// console.log(winStatus(arrTest3Col));
// console.log(winStatus(arrTest3DiagLR));
// console.log(winStatus(arrTes3tDiagRL));
// console.log(winStatus(arrTest3NoWin));
// console.log(setBoard(3));
// console.log(setBoard(4));
// console.log(setBoard(5));
