import { useState } from "react";
import { Board } from "./Board";
import { Moves } from "./Move";
import { Short } from "./Short";

// TODO:

// When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// Display the location for each move in the format (row, col) in the move history list.

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [moveOrder, setMoveOrder] = useState("asc");

  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleMove(nextMove) {
    setCurrentMove(nextMove);
  }

  function reorderMove(){
    if (moveOrder == "asc") {
      setMoveOrder("desc");
    } else {
      setMoveOrder("asc");
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <Short reorderMove={reorderMove}/>
        <Moves history={history} currentMove={currentMove} moveOrder={moveOrder} handleMove={handleMove}/>
      </div>
    </div>
  );
}
