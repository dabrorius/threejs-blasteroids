import * as THREE from "three";

export function Spaceship(scene) {
  const shipGeomtery = new THREE.ConeGeometry(0.3, 1, 8);
  const shipMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const ship = new THREE.Mesh(shipGeomtery, shipMaterial);
  scene.add(ship);

  // const movement = DirectionalMovement();
  const turnSpeed = Math.PI * 2;
  let direction = 0;
  const acceleration = 50;
  const deacceleration = 10;

  const maxSpeed = 5;
  let speedX = 0;
  let speedY = 0;

  const position = { x: 0, y: 0 };

  return (deltaTime, pressedKeys) => {
    position.x += deltaTime * speedX;
    position.y += deltaTime * speedY;

    ship.position.x = position.x;
    ship.position.y = position.y;
    ship.rotation.z = direction - Math.PI / 2;

    if (pressedKeys.has("ArrowUp")) {
      const unlimitedSpeedX =
        speedX + acceleration * deltaTime * Math.cos(direction);
      speedX =
        Math.sign(unlimitedSpeedX) *
        Math.min(maxSpeed, Math.abs(unlimitedSpeedX));

      const unlimitedSpeedY =
        speedY + acceleration * deltaTime * Math.sin(direction);
      speedY =
        Math.sign(unlimitedSpeedY) *
        Math.min(maxSpeed, Math.abs(unlimitedSpeedY));
    }

    if (pressedKeys.has("ArrowLeft")) {
      direction += turnSpeed * deltaTime;
    } else if (pressedKeys.has("ArrowRight")) {
      direction -= turnSpeed * deltaTime;
    }
  };
}
