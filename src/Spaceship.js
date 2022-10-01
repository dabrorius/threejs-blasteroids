import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function Spaceship(scene) {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  let targetSpeed = 6;

  const movement = DirectionalMovement();

  return (deltaTime, pressedKeys) => {
    const position = movement.update(deltaTime);

    box.position.x = position.x;
    box.position.y = position.y;

    movement.setSpeed(0);
    if (pressedKeys.has("ArrowRight")) {
      movement.setDirection(Math.PI / 2);
      movement.setSpeed(targetSpeed);
    }

    if (pressedKeys.has("ArrowLeft")) {
      movement.setDirection((Math.PI * 3) / 2);
      movement.setSpeed(targetSpeed);
    }

    if (pressedKeys.has("ArrowUp")) {
      movement.setDirection(0);
      movement.setSpeed(targetSpeed);
    }

    if (pressedKeys.has("ArrowDown")) {
      movement.setDirection(Math.PI);
      movement.setSpeed(targetSpeed);
    }
  };
}
