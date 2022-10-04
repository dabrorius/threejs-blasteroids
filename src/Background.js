import * as THREE from "three";

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
    this.mesh = new THREE.Points(particleGeometry, particleMaterial);
  }

  update(deltaTime) {
    this.mesh.rotation.y += deltaTime / 100;
  }
}
