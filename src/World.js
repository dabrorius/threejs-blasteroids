import * as THREE from "three";
import { Spaceship } from "./Spaceship";

export function World(scene) {
  const entities = new Set();

  const spaceship = Spaceship(scene);
  entities.add(spaceship);

  return (deltaTime, pressedKeys) => {
    entities.forEach((entity) => entity(deltaTime, pressedKeys));
  };
}
