import music_icon from './assets/icons/music-icon.png';
import InitialScreen from './components/initial_screen/initial_screen';
import GameScreen from './components/game_screen/game_screen';
import GameOverModal from './components/game_over_modal/game_over';
import { useState } from 'react';
import Config from './utils/config';
import pokemonModule from './utils/pokemon';
import Loading from './components/loading_animation/loading';
import STOREGE from './utils/storege.js';
import getMessage from './utils/getGameoverMsg';
import Sounds from './assets/sounds/sounds.js';
import Player from './utils/audio';

const deley = (ms) => new Promise((r) => setTimeout(r, ms));
const roundIncrease = 2;

function FloatButton() {
  const [isMute, setIsMute] = useState(STOREGE.get('isMute') || false);
  function toggleMusic() {
    Player.toggleMute();
    setIsMute(STOREGE.get('isMute'));
  }
  return (
    <button
      className={`float_btn ${isMute ? 'mute' : ''}`}
      onClick={toggleMusic}
    >
      <img src={music_icon} className="icon" />
    </button>
  );
}

function MainScreen() {
  const [score, setScore] = useState(0);
  const [dificulty, setDificulty] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [gameoverStatus, setGameoverStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonAmount, setPokemonAmount] = useState(Config[dificulty].amount);
  const { getRandomPokemons, shufllePokemons, pokemons, setPokemons } =
    pokemonModule();

  const init = async (amount) => {
    Player.stopAll();
    Player.playSoundEffect(Sounds.select);
    setScore(0);
    setIsLoading(true);

    const randomPokemons = await getRandomPokemons(amount || pokemonAmount);

    setPokemons(
      randomPokemons.map((pokemon) => ({ ...pokemon, isCliked: false }))
    );

    setIsGameStart(true);
    stopIntroMusic();

    await deley(1000);

    setIsLoading(false);
    playGameMusic();
  };

  function mainMenu() {
    Player.stopAll();
    Player.playSoundEffect(Sounds.select);
    setIsGameStart(false);
    setIsGameOver(false);
    setGameoverStatus('');
  }

  function gameover(gameoverStatus) {
    setGameoverStatus(gameoverStatus);
    setIsGameOver(true);
    stopGameMusic();
    setHighScore(gameoverStatus.score);
    if (gameoverStatus.status === 'win') {
      victoryMusic();
    } else {
      loseMusic();
    }
  }

  function setHighScore(score) {
    const highScore = STOREGE.get('highScore') || 0;
    STOREGE.save('highScore', Math.max(score, highScore));
  }

  function playAgain() {
    Player.play(Sounds.select);
    setPokemonAmount(Config[dificulty].amount);
    setIsGameOver(false);
    init(Config[dificulty].amount);
  }

  function addScore() {
    setScore(() => score + 1);
  }

  async function playRound(card) {
    if (card.isCliked) {
      gameover({
        status: 'lose',
        score: score,
        msg: getMessage(0),
      });
      return;
    }

    const index = pokemons.findIndex((pokemon) => pokemon.id === card.id);
    pokemons[index].isCliked = true;
    addScore();

    if (isAllCliked()) {
      gameover({
        status: 'win',
        score: pokemons.length,
        msg: getMessage(1),
      });
      return;
    }

    setPokemons([...shufllePokemons(pokemons)]);
  }

  function isAllCliked() {
    return pokemons.every((pokemon) => pokemon.isCliked);
  }

  function playIntroMusic() {
    Player.loop(Sounds.music_3);
  }

  function stopIntroMusic() {
    Player.stop(Sounds.music_3);
  }

  function playGameMusic() {
    Player.loop(Sounds.music_1);
  }

  function stopGameMusic() {
    Player.stop(Sounds.music_1);
  }

  function victoryMusic() {
    Player.play(Sounds.victory);
  }

  function loseMusic() {
    Player.play(Sounds.lose);
  }

  function changeDificulty(dificulty) {
    Player.playSoundEffect(Sounds.select);
    setPokemonAmount(Config[dificulty].amount);
    setDificulty(dificulty);
  }

  function nextRound() {
    Player.playSoundEffect(Sounds.levelUp);
    const newAmount = Math.min(50, pokemonAmount + roundIncrease);
    setPokemonAmount(newAmount);
    setIsGameOver(false);
    init(newAmount);
  }

  return (
    <div className="main_wrapper">
      <FloatButton />

      {isLoading && <Loading />}

      {isGameStart ? (
        <GameScreen
          setGameover={gameover}
          data={pokemons}
          amount={pokemonAmount}
          score={score}
          playRound={playRound}
          isLoading={isLoading}
          quit={mainMenu}
        />
      ) : (
        <InitialScreen
          dificulty={dificulty}
          setDificulty={changeDificulty}
          startGame={() => {
            init();
          }}
          playIntroMusic={playIntroMusic}
        />
      )}

      {isGameOver && (
        <GameOverModal
          quit={mainMenu}
          playAgain={playAgain}
          gameoverStatus={gameoverStatus}
          nextRound={nextRound}
        />
      )}
    </div>
  );
}

function App() {
  return <MainScreen />;
}

export default App;
