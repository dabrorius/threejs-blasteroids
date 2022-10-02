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
    update: function (deltaTime, pressedKeys) {
      this.entities.forEach(
        (entity) => entity.update && entity.update(deltaTime, pressedKeys)
      );
    },
  };

  const spaceship = Spaceship(world);
  world.addEntity(spaceship);

  const asteroidFactory = AsteroidFactory(scene);
  world.addEntity(asteroidFactory({ x: -3, y: 2 }));
  world.addEntity(asteroidFactory({ x: 3, y: -2 }));

  return (deltaTime, pressedKeys) => {
    world.update(deltaTime, pressedKeys);
  };
}
