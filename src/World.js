import * as THREE from "three";

export function World(scene) {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  return (deltaTime, pressedKeys) => {
    if (pressedKeys.has("ArrowRight")) {
      box.position.x += 1 * deltaTime;
    }

    if (pressedKeys.has("ArrowLeft")) {
      box.position.x -= 1 * deltaTime;
    }
  };
}
