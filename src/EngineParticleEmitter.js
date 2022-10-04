import * as THREE from "three";
import particleImage from "./textures/circle_05.png";

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load(particleImage);
const particleMaterial = new THREE.SpriteMaterial({
  map: particleTexture,
  color: 0xccbbff,
});
particleMaterial.blending = THREE.AdditiveBlending;

export class EngineParticleEmitter {
  constructor(parent) {
    this.particles = [];
    this.parent = parent;
  }

  emit(x, y) {
    const particle = new EngineParticle(this.parent, x, y);
    this.particles.push(particle);
  }

  update(deltaTime) {
    this.particles.forEach((particle) => {
      particle.update(deltaTime);
    });
    this.particles = this.particles.filter((p) => !p.dead);
  }
}

class EngineParticle {
  constructor(parent, x, y) {
    this.dead = false;
    this.parent = parent;
    this.sprite = new THREE.Sprite(particleMaterial);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.position.z = 0.1;
    parent.add(this.sprite);
  }

  update(deltaTime) {
    this.sprite.position.x += deltaTime;
    this.sprite.position.y += deltaTime;

    const newScale = Math.max(0, this.sprite.scale.x - deltaTime * 10);
    if (newScale === 0) {
      this.dead = true;
      this.parent.remove(this.sprite);
    }
    this.sprite.scale.set(newScale, newScale, newScale);
  }
}
