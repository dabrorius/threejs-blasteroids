import * as THREE from "three";

export function Spaceship(scene) {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  const speed = 5;

  return (deltaTime, pressedKeys) => {
    if (pressedKeys.has("ArrowRight")) {
      box.position.x += speed * deltaTime;
    }

    if (pressedKeys.has("ArrowLeft")) {
      box.position.x -= speed * deltaTime;
    }

    if (pressedKeys.has("ArrowUp")) {
      box.position.y += speed * deltaTime;
    }

    if (pressedKeys.has("ArrowDown")) {
      box.position.y -= speed * deltaTime;
    }
  };
}
