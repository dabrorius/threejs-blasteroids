import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function BulletFactory() {
  const bulletGeometry = new THREE.DodecahedronGeometry(0.1);
  const bulletMaterial = new THREE.MeshNormalMaterial();

  return (initialPosition, direction) => {
    const bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);

    const movement = DirectionalMovement(initialPosition, false);
    movement.setSpeed(20);
    movement.setDirection(direction);

    return {
      mesh: bulletMesh,
      hitbox: {
        x: 0,
        y: 0,
        r: 0.1,
        type: "bullet",
      },
      update: function (deltaTime) {
        const position = movement.update(deltaTime);
        bulletMesh.position.x = position.x;
        bulletMesh.position.y = position.y;

        this.hitbox.x = position.x;
        this.hitbox.y = position.y;
      },
    };
  };
}
