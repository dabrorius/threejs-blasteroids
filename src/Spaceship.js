import * as THREE from "three";
import { BulletFactory } from "./BulletFactory";
import textureImage from "./textures/8.png";

export function Spaceship(scene) {
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load(textureImage);

  const shipGeomtery = new THREE.ConeGeometry(0.3, 1, 8);
  const shipMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const ship = new THREE.Mesh(shipGeomtery, shipMaterial);
  scene.add(ship);

  const bullets = [];

  const bulletFactory = BulletFactory(scene);

  // const movement = DirectionalMovement();
  const turnSpeed = Math.PI;
  let direction = 0;
  const acceleration = 30;
  const deacceleration = 10;

  const maxSpeed = 5;
  let speedX = 0;
  let speedY = 0;

  const position = { x: 0, y: 0 };

  let bulletTimer = 0;
  let bulletDelay = 0.1;

  return (deltaTime, pressedKeys) => {
    bulletTimer = Math.max(0, bulletTimer - deltaTime);

    position.x += deltaTime * speedX;
    position.y += deltaTime * speedY;

    ship.position.x = position.x;
    ship.position.y = position.y;
    ship.rotation.z = direction - Math.PI / 2;

    bullets.forEach((bullet) => bullet(deltaTime));

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

    if (pressedKeys.has(" ")) {
      if (bulletTimer === 0) {
        const bullet = bulletFactory(
          { x: position.x, y: position.y },
          direction
        );
        bullets.push(bullet);
        bulletTimer = bulletDelay;
      }
    }
  };
}
