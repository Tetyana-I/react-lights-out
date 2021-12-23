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

function Board({ nrows = 4, ncols = 5, chanceLightStartsOn }) {
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
    // TODO: check the board in state to determine whether the player has won.
    // return board.every(row => (row.every(cell => cell == false)) == false)
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else


  // DONE: made table board

  return (
    <div>
      <h1>Lights Out!</h1>
      <table className="Board">
        {board.map((row) => (
          <tr>
            {row.map((lightOn) => (<Cell isLit={lightOn}/>))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Board;
