import music_1 from './music-1.mp3';
import music_2 from './music-2.mp3';
import music_3 from './music-3.mp3';
import victory from './victory.mp3';
import lose from './lose.mp3';
import select from './select.mp3';
import levelUp from './levelUp.mp3';

const Sounds = {
  music_1: new Audio(music_1),
  music_2: new Audio(music_2),
  music_3: new Audio(music_3),
  victory: new Audio(victory),
  lose: new Audio(lose),
  select: new Audio(select),
  levelUp: new Audio(levelUp),
};

export default Sounds;
