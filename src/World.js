import * as THREE from "three";
import { AsteroidFactory } from "./AsteroidFactory";
import { Spaceship } from "./Spaceship";

export function World(scene) {
  const world = {
    entities: new Set(),
    entitiesToRemove: [],
    entitiesToAdd: [],
    addEntity: function (entity) {
      this.entitiesToAdd.push(entity);
    },
    removeEntity: function (entity) {
      this.entitiesToRemove.push(entity);
    },
    update: function (deltaTime, pressedKeys) {
      this.entitiesToRemove.forEach((entity) => {
        this.entities.delete(entity);
        if (entity.mesh) {
          scene.remove(entity.mesh);
        }
      });
      this.entitiesToRemove = [];

      this.entitiesToAdd.forEach((entity) => {
        this.entities.add(entity);
        if (entity.mesh) {
          scene.add(entity.mesh);
        }
      });
      this.entitiesToAdd = [];

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
  world.addEntity(
    asteroidFactory({ x: 3, y: 3 }, 3, Math.random() * (Math.PI / 2))
  );
  world.addEntity(
    asteroidFactory({ x: 3, y: -3 }, 3, -Math.random() * (Math.PI / 2))
  );
  world.addEntity(
    asteroidFactory(
      { x: -3, y: -3 },
      3,
      Math.PI + Math.random() * (Math.PI / 2)
    )
  );
  world.addEntity(
    asteroidFactory({ x: -3, y: 3 }, 3, Math.PI - Math.random() * (Math.PI / 2))
  );

  return (deltaTime, pressedKeys) => {
    world.update(deltaTime, pressedKeys);
  };
}
