export function DirectionalMovement(startPosition = { x: 0, y: 0 }) {
  let position = startPosition;

  let speed = 0;
  let direction = 0;

  return {
    update: (deltaTime) => {
      const speedX = Math.sin(direction) * speed;
      const speedY = Math.cos(direction) * speed;

      position.x += speedX * deltaTime;
      position.y += speedY * deltaTime;

      return position;
    },
    setDirection: (newDirection) => (direction = newDirection),
    setSpeed: (newSpeed) => (speed = newSpeed),
  };
}
