import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

const maxSize = 3;

export function AsteroidFactory(world) {
  const asteroidGeometry = new THREE.DodecahedronGeometry(1);
  const asteroidMaterial = new THREE.MeshNormalMaterial();

  const createAsteroid = (initialPosition, size = 3, extDirection = null) => {
    const scale = size / maxSize;
    const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    asteroidMesh.scale.multiplyScalar(scale);

    const movement = DirectionalMovement({
      x: initialPosition.x,
      y: initialPosition.y,
    });
    movement.setSpeed(1 + (maxSize - size) / 2);
    const direction =
      extDirection === null ? Math.PI * 2 * Math.random() : extDirection;
    movement.setDirection(direction);

    const rotationSpeedX = (Math.random() * Math.PI) / 4 + Math.PI / 8;
    const rotationSpeedY = (Math.random() * Math.PI) / 4 + Math.PI / 8;

    return {
      mesh: asteroidMesh,
      hitbox: {
        x: 0,
        y: 0,
        r: scale,
        type: "asteroid",
      },
      direction,
      update: function (deltaTime) {
        const position = movement.update(deltaTime);
        movement.log();

        asteroidMesh.position.x = position.x;
        asteroidMesh.position.y = position.y;
        asteroidMesh.rotation.x += deltaTime * rotationSpeedX;
        asteroidMesh.rotation.y += deltaTime * rotationSpeedY;

        this.hitbox.x = position.x;
        this.hitbox.y = position.y;
      },
      onCollision: function (collider) {
        if (collider.hitbox.type === "bullet") {
          console.log("Colliding bullet");

          const position = {
            x: asteroidMesh.position.x,
            y: asteroidMesh.position.y,
          };
          if (size > 1) {
            const asteroidOne = createAsteroid(position, size - 1);
            world.addEntity(asteroidOne);
            world.addEntity(
              createAsteroid(
                position,
                size - 1,
                asteroidOne.direction + Math.PI
              )
            );
          }
          world.removeEntity(this);
          world.removeEntity(collider);
        }
      },
    };
  };
  return createAsteroid;
}
