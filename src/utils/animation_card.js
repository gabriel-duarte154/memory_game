function moveCard(x, y, card) {
  const positionX = (x - card.clientWidth / 2) / 4;
  const positionY = -(y - card.clientHeight / 2) / 4;

  card.style.transform = `rotateY(${positionX}deg) rotateX(${positionY}deg)`;
}
function resetPosition(card) {
  card.style.transform = `rotate(0)`;
}

export { moveCard, resetPosition };
