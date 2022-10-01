import * as THREE from "three";
import { AsteroidFactory } from "./AsteroidFactory";
import { Spaceship } from "./Spaceship";

export function World(scene) {
  const entities = new Set();

  const spaceship = Spaceship(scene);
  entities.add(spaceship);

  const asteroidFactory = AsteroidFactory(scene);
  entities.add(asteroidFactory({ x: -3, y: 2 }));
  entities.add(asteroidFactory({ x: 3, y: -2 }));

  return (deltaTime, pressedKeys) => {
    entities.forEach((entity) => entity(deltaTime, pressedKeys));
  };
}
