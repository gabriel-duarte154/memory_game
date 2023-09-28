function GameMenu({ dificulty, setDificulty, startGame }) {
  function difineDificulty(value) {
    setDificulty(value);
  }
  return (
    <div className="box_modal">
      <div className="dificulty_wrapper">
        <button
          className={dificulty === 0 ? 'selected' : 'btn-hover'}
          onClick={() => difineDificulty(0)}
        >
          Easy
        </button>
        <button
          className={dificulty === 1 ? 'selected' : 'btn-hover'}
          onClick={() => difineDificulty(1)}
        >
          Medium
        </button>
        <button
          className={dificulty === 2 ? 'selected' : 'btn-hover'}
          onClick={() => difineDificulty(2)}
        >
          Hard
        </button>
      </div>
      <div>
        <button className="btn-hover" onClick={() => startGame()}>
          Start Game
        </button>
      </div>
      <div>
        <a href="#" className="btn-hover">
          Git Hub
        </a>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="title_container">
      <h1 className="main_title tshadow">Memory Game</h1>
    </div>
  );
}

function InitialScreen({
  dificulty,
  setDificulty,
  setIsGameStart,
  startGame,
  playIntroMusic,
}) {
  playIntroMusic();
  return (
    <div className="initial_screen">
      <Title />
      <GameMenu
        dificulty={dificulty}
        setDificulty={setDificulty}
        setIsGameStart={setIsGameStart}
        startGame={startGame}
      />
    </div>
  );
}

export default InitialScreen;
