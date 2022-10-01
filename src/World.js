import * as THREE from "three";
import { AsteroidFactory } from "./AsteroidFactory";
import { Spaceship } from "./Spaceship";

export function World(scene) {
  const entities = new Set();

  const spaceship = Spaceship(scene);
  entities.add(spaceship);

  const asteroid = AsteroidFactory(scene);
  entities.add(asteroid);

  return (deltaTime, pressedKeys) => {
    entities.forEach((entity) => entity(deltaTime, pressedKeys));
  };
}
