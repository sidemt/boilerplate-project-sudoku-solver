import { puzzlesAndSolutions } from './puzzle-strings.js';

const TEXTAREA = document.getElementById('text-input');
const ERRORMSG = document.getElementById('error-msg');
const VALID_NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  TEXTAREA.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  // Fill in the sudoku grid
  let text = TEXTAREA.value;

  checkLength(text);
  let obj = parsePuzzleString(text);
  updateGrid(obj);

  TEXTAREA.addEventListener('input', textAreaHandler);
  setEventListenerToGrids();
  document.getElementById('solve-button').addEventListener('click', solveHandler);
  document.getElementById('clear-button').addEventListener('click', clearHandler);
});

// Parse a valid puzzle string into an object
function parsePuzzleString(str){
  let obj = {};
  let count = 0;
  ROWS.forEach(row => {
    COLS.forEach(col => {
      let char = str.charAt(count);
      obj[`${row}${col}`] = filterInvalidNum(char);
      count++;
    })
  })
  return obj;
}

function parsePuzzleObj(obj){
  let arr = Object.values(obj);
  return arr.join('');
}

function filterInvalidNum(char){
  if (VALID_NUMS.includes(char)){
    return char
  }else{
    return '.'
  }
}

// Puzzles that are not 81 characters long show the error message
function checkLength(str){
  if (str.length === 81){
    ERRORMSG.innerHTML = '';
  }else{
    ERRORMSG.innerHTML = 'Error: Expected puzzle to be 81 characters long.';
  }
}

function setEventListenerToGrids() {
  let count = 0;
  let text = TEXTAREA.value;
  ROWS.forEach(row => {
    COLS.forEach(col => {

      let puzzle_grid = document.getElementById(`${row}${col}`);
      console.log(`${row}${col} count: ${count}`);
      puzzle_grid.addEventListener('input', inputHandler);
      count++;
    })
  })
}

function inputHandler(event){
  console.log('input', event.target.id);

  let val = event.target.value;
  let obj = parsePuzzleString(TEXTAREA.value);
  // Update corresponding value
  obj[event.target.id] = filterInvalidNum(val);

  // Update text area
  TEXTAREA.value = parsePuzzleObj(obj);
}

function textAreaHandler(event){
  let val = event.target.value;
  checkLength(val);

  let obj = parsePuzzleString(val);
  updateGrid(obj);
}

function solveHandler(event){
  console.log('solve');
  let val = TEXTAREA.value;
  let solution = findSolution(val);
  if (solution.length === 81) {
    console.log('solution found');
    TEXTAREA.value = solution;
    updateGrid(parsePuzzleString(solution));
  }
}

function clearHandler(event){
  console.log('clear');
  TEXTAREA.value = '';
  updateGrid(parsePuzzleString(''));
}

function updateGrid(obj){
  // Fill in the sudoku grid
  ROWS.forEach(row => {
    COLS.forEach(col => {
      let puzzle_grid = document.getElementById(`${row}${col}`);
      if(obj[`${row}${col}`] === '.'){
        puzzle_grid.value = '';
      }else{
        puzzle_grid.value = obj[`${row}${col}`];
      }
    })
  })
}

function findSolution(str){
  let solution = puzzlesAndSolutions.filter(element => element[0] === str);

  if (solution.length > 0){
    return solution[0][1];
  }else{
    return '';
  }
}

function validatePuzzle(str){
  let solution = puzzlesAndSolutions.filter(element => element[1] === str);

  if (solution.length > 0){
    return true;
  }else{
    return false;
  }
}

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    parsePuzzleString: parsePuzzleString,
    filterInvalidNum: filterInvalidNum,
    checkLength: checkLength,
    findSolution: findSolution,
    validatePuzzle: validatePuzzle,
  }
} catch (e) {}
