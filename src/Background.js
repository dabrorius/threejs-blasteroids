import * as THREE from "three";
import particleImage from "./textures/bg.jpg";

const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load(particleImage);
const bgMaterial = new THREE.SpriteMaterial({
  map: bgTexture,
  color: 0xccbbff,
});
const background = new THREE.Sprite(bgMaterial);
background.scale.set(170, 80, 1);
background.position.set(0, 0, -70);

const particleGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;
  const radius = 21 + Math.random() * 50;
  const randomAngle = Math.random() * 2 * Math.PI;

  const x = Math.cos(randomAngle) * radius;
  const z = Math.sin(randomAngle) * radius;

  positions[i3] = x;
  positions[i3 + 1] = (Math.random() - 0.5) * 40;
  positions[i3 + 2] = z;
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size = 0.2;
particleMaterial.sizeAttenuation = true;

export class Background {
  constructor() {
    this.mesh = new THREE.Group();
    this.stars = new THREE.Points(particleGeometry, particleMaterial);
    this.mesh.add(this.stars);

    this.mesh.add(background);
  }

  update(deltaTime) {
    this.stars.rotation.y += deltaTime / 100;
  }
}
