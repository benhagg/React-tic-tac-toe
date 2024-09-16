export default function GameOver({ winner, setRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{winner ? `${winner} won!` : "Draw"}</p>
      <button onClick={setRestart}>Play Again</button>
    </div>
  );
}
