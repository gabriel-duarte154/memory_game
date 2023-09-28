function GameOverModal({ quit, gameoverStatus, playAgain, nextRound }) {
  return (
    <div className="modal_wrapper">
      <div className="box_modal animation-showUp">
        <div>
          <h2 className="modal_title">{gameoverStatus.msg}</h2>
        </div>
        <div className="modal_text">Final Score: {gameoverStatus.score}</div>
        <div className="modal_btn-wrapper">
          <button
            className={` btn-hover ${
              gameoverStatus.status === 'win' ? '' : 'hidden'
            }`}
            onClick={nextRound}
          >
            Next Round
          </button>
          <button onClick={playAgain} className="btn-hover">
            Play Again
          </button>
          <button onClick={quit} className="btn-hover">
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
