import { useEffect, useRef, useState } from 'react';
import star_icon from '../../assets/icons/star_icon.png';
import { moveCard, resetPosition } from '../../utils/animation_card';
import STORAGE from '../../utils/storege.js';

function Score({ amount, score }) {
  return (
    <div className="score_wrapper">
      <div className="tshadow high_score">
        <img src={star_icon} className="icon" />
        High Score: {STORAGE.get('highScore') || 0}
      </div>
      <div className="tshadow">
        {score}/{amount}
      </div>
    </div>
  );
}

function GameHeader({ amount, score, quit }) {
  return (
    <div className="game_header">
      <button className="main_title main_title-small tshadow" onClick={quit}>
        Memory Game
      </button>
      <Score amount={amount} score={score} />
    </div>
  );
}

function Card({ data, playRound }) {
  const [isplayable, setIsPlayable] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsPlayable(true), 800);
  }, []);

  return (
    <button
      className={`card_container ${isplayable ? '' : 'pointer-events_none'}`}
      onMouseMove={(e) => {
        moveCard(e.nativeEvent.layerX, e.nativeEvent.layerY, cardRef.current);
      }}
      onMouseLeave={() => resetPosition(cardRef.current)}
      onClick={() => {
        playRound(data);
        resetPosition(cardRef.current);
      }}
    >
      <div ref={cardRef} className={`card ${data.isShiny ? 'shiny' : ''}`}>
        <div>
          <h2 className="card_name">{data.name}</h2>
          <img src={data.sprit} className="card_img" draggable="false" />
        </div>
      </div>
    </button>
  );
}

function CardsWrapper({ data, playRound, isLoading }) {
  const cards = data.map((pokemon) => (
    <Card key={pokemon.id} data={pokemon} playRound={playRound} />
  ));

  const wrapper = useRef(null);

  return (
    <>
      <div className={isLoading ? 'hidden' : 'cards_wrapper'} ref={wrapper}>
        {cards}
      </div>
    </>
  );
}

function GameScreen({ amount, data, score, playRound, isLoading, quit }) {
  return (
    <div className="game_screen">
      <GameHeader amount={amount} score={score} quit={quit} />
      <CardsWrapper data={data} playRound={playRound} isLoading={isLoading} />
    </div>
  );
}

export default GameScreen;
