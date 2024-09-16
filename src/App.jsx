import { useState } from "react";

import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

function deriveActivePlayer(log) {
  let currentPlayer = "X";
  if (log.length > 0 && log[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameLog, setGameLog] = useState([]);
  const [players, setPlayers] = useState({ X: "Player1", O: "Player2" });

  const activPlayer = deriveActivePlayer(gameLog);

  function handleClickSquare(rowIndex, colIndex) {
    setGameLog((prevLog) => {
      const currentPlayer = deriveActivePlayer(prevLog);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevLog,
      ];
      return updatedTurns;
    });
  }

  let gameBoard = [...initGameboard.map((array) => [...array])]; // reference to the initial game board. changes will be made to initGameBoard
  for (const turn of gameLog) {
    const { player, square } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  let draw = gameLog.length === 9 && !winner;
  if (gameLog.length > 4) {
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];
      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol];
      }
    }
  }

  function handleRestart() {
    setGameLog([]);
  }

  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: playerName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            name="Player1"
            symbol="X"
            isActive={activPlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activPlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} setRestart={handleRestart} />
        )}
        <Gameboard onSelectSquare={handleClickSquare} board={gameBoard} />
      </div>
      <Log />
    </main>
  );
}

export default App;
