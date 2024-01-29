export function Moves({ history, currentMove, moveOrder, handleMove }) {
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
