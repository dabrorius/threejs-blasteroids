import * as THREE from "three";

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

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

window.addEventListener("resize", () => {
  viewport.width = window.innerWidth;
  viewport.height = window.innerHeight;

  // Update camera
  camera.aspect = viewport.width / viewport.height;
  camera.updateProjectionMatrix();

  updateRenderer();
});

const gameLoop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(gameLoop);
};
gameLoop();
