import STOREGE from './storege';

const Player = (() => {
  const _playingMusics = [];
  let _isMute = STOREGE.get('isMute') || false;
  let _volume = 0.2;
  let _soundEffectVolume = 0.8;

  const play = (music) => {
    if (_playingMusics.includes(music)) {
      return;
    }
    _playingMusics.push(music);
    music.currentTime = 0;
    music.volume = _isMute ? 0 : _volume;
    music.play();

    if (!music.loop) {
      music.addEventListener('ended', () => {
        remove(music);
      });
    }
  };

  const loop = (music) => {
    music.loop = true;
    play(music);
  };

  const mute = () => {
    _playingMusics.forEach((music) => (music.volume = _isMute ? 0 : _volume));
  };

  const remove = (music) => {
    let index = _playingMusics.findIndex(
      (playMusic) => playMusic.src === music.src
    );

    if (index < 0) return;
    _playingMusics.splice(index, 1);
  };

  const stop = (music) => {
    music.pause();
    remove(music);
  };

  const toggleMute = () => {
    _isMute = !_isMute;
    STOREGE.save('isMute', _isMute);
    mute();
  };

  const stopAll = () => {
    _playingMusics.forEach((music) => stop(music));
  };

  const playSoundEffect = (effect) => {
    effect.volume = _soundEffectVolume;
    effect.currentTime = 0;
    effect.play();
  };

  return {
    play,
    loop,
    stop,
    toggleMute,
    stopAll,
    playSoundEffect,
  };
})();

export default Player;
