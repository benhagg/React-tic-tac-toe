export default function board({ onSelectSquare, board }) {
  // function handleSelectSquare(rowIndex, colIndex) {
  //   setboard((prevboard) => {
  //     let updatedBoard = [...prevboard.map((innerArr) => [...innerArr])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  // this code below seems to be more effcient but react does not handle it well. (now in the App component)
  // if (turns.length > 0) {
  //   const { player, square } = turns[0];
  //   const { row, col } = square;
  //   board[row][col] = player;
  // }
  // do this instead
  // for (const turn of turns) {
  //   const { player, square } = turn;
  //   const { row, col } = square;
  //   board[row][col] = player;
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
