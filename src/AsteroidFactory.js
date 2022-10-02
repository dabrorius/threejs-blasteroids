import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

export function AsteroidFactory(world) {
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
      hitbox: {
        x: 0,
        y: 0,
        r: 0.5,
        type: "asteroid",
      },
      update: function (deltaTime) {
        const position = movement.update(deltaTime);

        asteroidMesh.position.x = position.x;
        asteroidMesh.position.y = position.y;
        asteroidMesh.rotation.x += deltaTime * rotationSpeedX;
        asteroidMesh.rotation.y += deltaTime * rotationSpeedY;

        this.hitbox.x = position.x;
        this.hitbox.y = position.y;
      },
      onCollision: function (collider) {
        if (collider.hitbox.type === "bullet") {
          world.removeEntity(this);
        }
      },
    };
  };
}
