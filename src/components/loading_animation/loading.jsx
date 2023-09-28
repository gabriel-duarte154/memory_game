import { useEffect, useRef } from 'react';
import red_running from '../../assets/sprit/red_sprit_2x.png';

function animate(canvas) {
  const ctx = canvas.getContext('2d');
  const sprit = new Image();
  sprit.src = red_running;

  const spritWidth = 100;
  const spritHeight = 116;
  const frameTime = 1000 / 6;
  let lastFrame = 0;
  let timer = 0;
  let frame = 0;

  function animation(timeStamp = 0) {
    const deltaTime = timeStamp - lastFrame;
    lastFrame = timeStamp;
    timer += deltaTime;

    if (timer > frameTime) {
      frame > 4 ? (frame = 0) : frame++;
      timer = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      sprit,
      spritWidth * frame,
      0,
      spritWidth,
      spritHeight,
      0,
      0,
      spritWidth,
      spritHeight
    );
    requestAnimationFrame(animation);
  }
  animation();
}

function Loading() {
  const size = { width: 100, height: 116 };
  const canvas1 = useRef(null);

  useEffect(() => {
    animate(canvas1.current);
  }, []);
  return (
    <div className="modal_wrapper bg_load">
      <div className="loading">
        <canvas {...size} ref={canvas1}></canvas>
        <p className="tshadow">loading...</p>
      </div>
    </div>
  );
}

export default Loading;
