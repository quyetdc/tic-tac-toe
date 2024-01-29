import classNames from "classnames";

export function Board({ xIsNext, squares, onPlay }) {
  const totalRows = 3;
  const totalCols = 3;

  let status;
  let winner;
  let winnerLine = [];

  if (calculateWinner(squares)) {
    [winner, winnerLine] = calculateWinner(squares);
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
      let highlight = false;

      const index = row*3 + col;

      if (winnerLine.includes(index)) {
        highlight = true
      }

      console.log("highlight: ", highlight);

      rows.push(<Square highlight={highlight} value={squares[index]} onSquareClick={() => handleClick(index)} />);
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

function Square({value, onSquareClick, highlight}) {
  console.log("Square: ", value);

  return (
    <button
      className={classNames("square", {"highlight": highlight})}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
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
      return [squares[a], lines[index]];
    }
  }

  return null;
}
