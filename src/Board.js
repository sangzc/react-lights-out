import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {

  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: .7
  }
  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(this.props.nrows, this.props.ncols)
      // board: [
      //         [T,T,T,T,T],
      //         [T,F,T,F,T],
      //         [F,F,F,T,T],
      //         [T,F,T,T,T],
      //         [F,F,F,T,F]
      //       ]
    }
    this.createBoard = this.createBoard.bind(this);
    // this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard(ncol, nrow) {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrow; i++) {
      let row = [];
      for (let i = 0; i < ncol; i++) {
        row.push(this.getBooleanByChance(this.props.chanceLightStartsOn));
      }
      board.push(row);
    }
    return board;
  }

  /** create a function to generate a boolean value based on parameter of chance */

  getBooleanByChance(chance) {
    const random = Math.random();
    return random < chance ? true : false;
  }
  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y, x - 1);
    flipCell(y + 1, x);
    flipCell(y, x + 1);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    for (let row in board) {
      if (!row.includes(true)) {
        hasWon = true;
      }
    }

    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    // let self = this;

    // return (
    //     <table className="Board">
    //       {this.state.board.map(function (row, y) {
    //           return <tr>
    //             {row.map(function (cell, x){
    //               console.log("THIS IS NOW", self)
    //               return <Cell isLit={cell} key={`${y}-${x}`}
    //                 flipCellsAroundMe={() => self.flipCellsAround(`${y}-${x}`)} 
    //               />
    //               })
    //             }
    //           </tr>
    //         })
    //       }
    //     </table>
    //     )

        return (
          <table className="Board">
          <tbody>
            {this.state.board.map((row, y) => (
                <tr key={y}>
                  {row.map((cell, x) => (
                    <Cell isLit={cell} key={`${y}-${x}`}
                      flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)} 
                    />
                    ))
                  }
                </tr>
              ))
            }
            </tbody>
          </table>
          )
      }
      }
    
    export default Board;
