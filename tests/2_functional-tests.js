/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      let textAreaValue = '1....5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.9';
      let obj = Solver.parsePuzzleString(textAreaValue);
      Solver.updateGrid(obj);

      assert.equal(document.getElementById('A1').value, '1');
      assert.equal(document.getElementById('A3').value, '');
      assert.equal(document.getElementById('I9').value, '9');
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      Solver.updateTextArea('A1', '1');

      assert.equal(document.getElementById('text-input').value, '1................................................................................');

      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test('Function clearInput()', done => {

      Solver.clearHandler();
      assert.equal(document.getElementById('text-input').value, '');

      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      let string = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

      document.getElementById('text-input').value = string;

      Solver.solveHandler();
      assert.equal(document.getElementById('text-input').value, solution);

      done();
    });
  });
});

