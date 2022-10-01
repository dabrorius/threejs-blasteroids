export function DirectionalMovement(startPosition = { x: 0, y: 0 }) {
  let position = startPosition;

  let speed = 0;
  let direction = 0;
  const warpX = 10;
  const warpY = 10;

  return {
    update: (deltaTime) => {
      const speedX = Math.sin(direction) * speed;
      const speedY = Math.cos(direction) * speed;

      position.x += speedX * deltaTime;
      position.y += speedY * deltaTime;

      if (position.x > warpX) {
        position.x = -warpX;
      }
      if (position.x < -warpX) {
        position.x = warpX;
      }
      if (position.y > warpY) {
        position.y = -warpY;
      }
      if (position.y < -warpY) {
        position.y = warpY;
      }

      return position;
    },
    setDirection: (newDirection) => (direction = newDirection),
    setSpeed: (newSpeed) => (speed = newSpeed),
  };
}
