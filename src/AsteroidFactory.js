import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function AsteroidFactory(scene) {
  const asteroidGeometry = new THREE.DodecahedronGeometry(0.5);
  const asteroidMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  scene.add(asteroidMesh);

  const movement = DirectionalMovement({ x: 2, y: 2 });
  movement.setSpeed(2);
  movement.setDirection(Math.PI * 2 * Math.random());

  return (deltaTime) => {
    const position = movement.update(deltaTime);

    asteroidMesh.position.x = position.x;
    asteroidMesh.position.y = position.y;
  };
}
