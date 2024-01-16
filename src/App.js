import { useState } from "react";

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// TODO:

// Refactoring
  // - file structure
  // - short moves / orders

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

function Board({ xIsNext, squares, onPlay }) {
  const totalRows = 3;
  const totalCols = 3;

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const board = [];
  let rows = [];

  for (let row = 0; row < totalRows; row++) {
    rows = [];
    for (let col = 0; col < totalCols; col++) {
      rows.push(<Square value={squares[row*3 + col]} onSquareClick={() => handleClick(row*3 + col)} />);
    }

    board.push(<div className="board-row">{rows}</div>)
  }

  return (
    <>
      <div className="status">{status}</div>

      {board}
    </>
  );
}

function Moves({ history, currentMove, moveOrder, handleMove }) {
  const displayMoves = [];

  for (let index = 0; index < history.length; index++) {
    let move, description;

    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }

    if (index === currentMove) {
      move = (
        <li key={currentMove}>
          You are at move #{currentMove}
        </li>
      )
    } else {
      move = ( <li key={index}>
        <button onClick={ () => handleMove(index)}> {description} </button>
      </li>);
    }

    if (moveOrder === "desc") {
      displayMoves.unshift(move);
    } else {
      displayMoves.push(move);
    }
  }

  return (
    <ol>{displayMoves}</ol>
  )
}

function Short({reorderMove}) {
  return (
    <div>
      <button onClick={() => reorderMove()}>Short Moves</button>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
