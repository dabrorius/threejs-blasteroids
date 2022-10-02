import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function BulletFactory() {
  const bulletGeometry = new THREE.DodecahedronGeometry(0.1);
  const bulletMaterial = new THREE.MeshNormalMaterial();

  return (initialPosition, direction) => {
    const bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);

    console.log("Initial", initialPosition);

    const movement = DirectionalMovement(initialPosition, false);
    movement.setSpeed(20);
    movement.setDirection(direction);

    return {
      mesh: bulletMesh,
      update: (deltaTime) => {
        const position = movement.update(deltaTime);
        bulletMesh.position.x = position.x;
        bulletMesh.position.y = position.y;
      },
    };
  };
}
