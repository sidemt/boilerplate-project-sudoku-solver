// import { puzzlesAndSolutions } from './puzzle-strings.js';

const textArea = document.getElementById('text-input');
const valid_nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function calcGridNum(grid_name){
  let arr = grid_name.split('');
  let row_index = rows.indexOf(arr[0]);
  let col_index = cols.indexOf(arr[1]);
  return row_index * 9 + col_index;
}

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  // Fill in the sudoku grid
  let text = textArea.value;
  let count = 0;
  rows.forEach(row => {
    cols.forEach(col => {
      let char = text.charAt(count);
      if (valid_nums.includes(char)){
        let puzzle_grid = document.getElementById(`${row}${col}`);
        puzzle_grid.value = char;
      }
      count++;
    })
  })
  setEventListenerToGrids();
});

function setEventListenerToGrids() {
  let count = 0;
  let text = textArea.value;
  rows.forEach(row => {
    cols.forEach(col => {

      let puzzle_grid = document.getElementById(`${row}${col}`);
      console.log(`${row}${col} count: ${count}`);
      puzzle_grid.addEventListener('input', inputHandler);
      count++;
    })
  })
}

function inputHandler(event){
  console.log(event.target.id);
  let count = calcGridNum(event.target.id);
  console.log('input', count);

  let val = event.target.value;
  let arr = textArea.value.split('');
  if(valid_nums.includes(val)){
    arr.splice(count, 1, val);
  }else{
    arr.splice(count, 1, '.');
  }

  textArea.value = arr.join('');
}


/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    calcGridNum: calcGridNum,
    setEventListenerToGrids: setEventListenerToGrids,
    inputHandler: inputHandler,
  }
} catch (e) {}
