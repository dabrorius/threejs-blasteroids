import * as THREE from "three";
import { AsteroidFactory } from "./AsteroidFactory";
import { Spaceship } from "./Spaceship";

export function World(scene) {
  const world = {
    entities: new Set(),
    addEntity: function (entity) {
      this.entities.add(entity);
      if (entity.mesh) {
        scene.add(entity.mesh);
      }
    },
    removeEntity: function (entity) {
      this.entities.delete(entity);
      if (entity.mesh) {
        scene.remove(entity.mesh);
      }
    },
    update: function (deltaTime, pressedKeys) {
      this.entities.forEach(
        (entity) => entity.update && entity.update(deltaTime, pressedKeys)
      );

      const hitboxEntities = Array.from(this.entities).filter((e) => e.hitbox);
      hitboxEntities.forEach((entityA, entityAIndex) => {
        for (
          let entityBIndex = entityAIndex + 1;
          entityBIndex < hitboxEntities.length;
          entityBIndex++
        ) {
          const entityB = hitboxEntities[entityBIndex];
          const hitboxA = entityA.hitbox;
          const hitboxB = entityB.hitbox;

          const sqDistance =
            Math.pow(hitboxA.x - hitboxB.x, 2) +
            Math.pow(hitboxA.y - hitboxB.y, 2);
          const sqRadiuses = Math.pow(hitboxA.r, 2) + Math.pow(hitboxB.r, 2);
          if (sqDistance < sqRadiuses) {
            if (entityA.onCollision) {
              entityA.onCollision(entityB);
            }
            if (entityB.onCollision) {
              entityB.onCollision(entityA);
            }
          }
        }
      });
    },
  };

  const spaceship = Spaceship(world);
  world.addEntity(spaceship);

  const asteroidFactory = AsteroidFactory(world);
  world.addEntity(asteroidFactory({ x: -3, y: 2 }));
  world.addEntity(asteroidFactory({ x: 3, y: -2 }));

  return (deltaTime, pressedKeys) => {
    world.update(deltaTime, pressedKeys);
  };
}
