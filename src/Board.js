export function Board({ xIsNext, squares, onPlay }) {
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
