import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function AsteroidFactory() {
  const asteroidGeometry = new THREE.DodecahedronGeometry(0.5);
  const asteroidMaterial = new THREE.MeshNormalMaterial();

  return (initialPosition) => {
    const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    const movement = DirectionalMovement(initialPosition);
    movement.setSpeed(2);
    movement.setDirection(Math.PI * 2 * Math.random());

    const rotationSpeedX = (Math.random() * Math.PI) / 4 + Math.PI / 8;
    const rotationSpeedY = (Math.random() * Math.PI) / 4 + Math.PI / 8;

    return {
      mesh: asteroidMesh,
      update: (deltaTime) => {
        const position = movement.update(deltaTime);

        asteroidMesh.position.x = position.x;
        asteroidMesh.position.y = position.y;
        asteroidMesh.rotation.x += deltaTime * rotationSpeedX;
        asteroidMesh.rotation.y += deltaTime * rotationSpeedY;
      },
    };
  };
}
