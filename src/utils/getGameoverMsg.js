const loseMsg = [
  'Game Over!!',
  'Can you Do Better?',
  'You need to do better!!',
  'Try Again!',
  "You don't have a good memory.",
];

const victoryMsg = ['Well Done!', 'Aweosome!', 'Great!'];

function getMessage(code) {
  return code === 1
    ? victoryMsg[Math.floor(Math.random() * victoryMsg.length)]
    : loseMsg[Math.floor(Math.random() * loseMsg.length)];
}

export default getMessage;
