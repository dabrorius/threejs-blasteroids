import * as THREE from "three";
import { World } from "./World";

const viewport = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  viewport.width / viewport.height,
  0.1,
  100
);
camera.position.z = 4;
scene.add(camera);

const canvas = document.querySelector(".gameCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
const updateRenderer = () => {
  renderer.setSize(viewport.width, viewport.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
updateRenderer();

window.addEventListener("resize", () => {
  viewport.width = window.innerWidth;
  viewport.height = window.innerHeight;

  // Update camera
  camera.aspect = viewport.width / viewport.height;
  camera.updateProjectionMatrix();

  updateRenderer();
});

/**
 * Handle key press tracking
 */
const pressedKeys = new Set();

document.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key);
});

document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key);
});

const updateWorld = World(scene);

/**
 * Game Loop - world rendering
 */
const clock = new THREE.Clock();
let lastTime = 0;
const gameLoop = () => {
  const currentTime = clock.getElapsedTime();
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  updateWorld(deltaTime, pressedKeys);
  renderer.render(scene, camera);

  window.requestAnimationFrame(gameLoop);
};
gameLoop();
