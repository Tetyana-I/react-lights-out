import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // DONE: created array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let newRow = [];
      for (let x = 0; x < ncols; x++) {
        // generate 0 if math.random() returns value <= 0.5 or 1 otherwise
        let cell = Math.round(Math.random()*2);
        cell ? newRow.push(true) : newRow.push(false);  
      }
      initialBoard.push(newRow);
    }
    return initialBoard;
  }
  
  function hasWon() {
    // DONE: checked the board in state to determine whether the player has won.
    return board.every(row => (row.every(cell => (cell === false)) === true))
  }

  // function returns deep copy of 2D-array
  function boardDeepCopy(inBoard) {
    const outBoard = inBoard.map(row => (row.map(cell => cell)));
    return outBoard;
  }

  function flipCellsAround(x,y) {
    setBoard(board => {
      // DONE: Made a (deep) copy of the "old board" (in state)
      const boardCopy = boardDeepCopy(board);     
      
      // function flips the cell(y,x) and the cells around it
      const flipCell = (y, x) => {
        // if this coordinates (y,x) are actually on board, flip cell-value
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          // flip up-cell  
          if (y >= 1) boardCopy[y-1][x] = !boardCopy[y-1][x];
          //  flip down-cell
          if (y < nrows-1) boardCopy[y+1][x] = !boardCopy[y+1][x];
          //  flip right-cell
          if (x < ncols-1) boardCopy[y][x+1] = !boardCopy[y][x+1];
          //  flip left-cell
          if (x >= 1) boardCopy[y][x-1] = !boardCopy[y][x-1];
        }
      };

  // DONE: in the copy, flip this cell and the cells around it
  flipCell(y,x,boardCopy);

  // DONE: returned the copy
  return boardCopy;
  });
}
  
  // DONE: made table board
  if (!hasWon()) {
    return (
      <div>
        <h1>Lights Out Puzzle</h1>
        <p className="Board-rules"> 
          You can click on a cell to toggle that light — 
          but it also toggles the light above it, to the left of it, to the right of it, and below it. <br></br>
          <b>The puzzle is won when when all of the lights are turned off.</b>
        </p>
        <table className="Board">
          {board.map((row, y) => (
            <tr>
              {row.map((lightOn, x) => (<Cell isLit={lightOn} y={y} x={x} flipCellsAround = {flipCellsAround}/>))}
            </tr>
          ))}
        </table>
      </div>
    );
  } 
  else 
  return (
    <div>
      <h2 className="Board-msg">You Won ! </h2>
    </div>
  );
}

Board.defaultProps = {
  nrows: 5,
  ncols: 5
};

export default Board;
