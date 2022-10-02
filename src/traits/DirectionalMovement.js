export function DirectionalMovement(
  startPosition = { x: 0, y: 0 },
  warp = true
) {
  let position = startPosition;

  let speed = 0;
  let direction = 0;
  const warpX = 10;
  const warpY = 10;

  return {
    update: (deltaTime) => {
      const speedX = Math.cos(direction) * speed;
      const speedY = Math.sin(direction) * speed;
      console.log("DT ->", deltaTime, speedX, speedY);

      position.x += speedX * deltaTime;
      position.y += speedY * deltaTime;

      if (warp) {
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
      }

      return position;
    },
    setDirection: (newDirection) => (direction = newDirection),
    setSpeed: (newSpeed) => (speed = newSpeed),
    getDirection: () => direction,
    log: () => {
      console.log(
        "Moving at ",
        speed,
        " towards ",
        direction,
        "currently @ ",
        position
      );
    },
  };
}
