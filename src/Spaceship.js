import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Bullet } from "./Bullet";
import { EngineParticleEmitter } from "./EngineParticleEmitter";
import shipModel from "./objects/cuship.glb";

const bulletDelay = 0.1;
const turnSpeed = Math.PI;

const loader = new GLTFLoader();

const particleDelay = 1 / 80;

export class Spaceship {
  constructor() {
    this.mesh = new THREE.Group();

    this.engineLight = new THREE.PointLight(0xddddff, 0, 8);
    this.engineLight.position.set(-0.5, 0, 0.3);

    this.mesh.add(this.engineLight);

    loader.load(
      shipModel,
      (gltf) => {
        gltf.scene.scale.multiplyScalar(0.8);
        gltf.scene.rotation.x = Math.PI / 2;
        this.mesh.add(gltf.scene);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => console.log("An error happened", error)
    );

    this.engineParticleTimer = 0;

    this.bulletTimer = 0;
    this.position = { x: 0, y: 0 };
    this.speedX = 0;
    this.speedY = 0;
    this.direction = 0;

    this.hitbox = {
      x: 0,
      y: 0,
      r: 0.8,
      type: "spaceship",
    };
  }

  onAdded() {
    this.particleEmitter = new EngineParticleEmitter(this.world.scene);
  }

  update(deltaTime, pressedKeys) {
    this.particleEmitter.update(deltaTime);

    this.bulletTimer = Math.max(0, this.bulletTimer - deltaTime);
    this.engineParticleTimer = Math.max(
      0,
      this.engineParticleTimer - deltaTime
    );
    this.engineLight.intensity = Math.max(
      0.1,
      this.engineLight.intensity - deltaTime * 10
    );

    this.position.x += deltaTime * this.speedX;
    this.position.y += deltaTime * this.speedY;

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.rotation.z = this.direction - Math.PI / 2;

    this.hitbox.x = this.position.x;
    this.hitbox.y = this.position.y;

    if (pressedKeys.has("ArrowUp")) {
      this.#accelerate(deltaTime);

      if (this.engineParticleTimer === 0) {
        this.engineLight.intensity = 1;
        this.engineParticleTimer = particleDelay;
        const engineLoffsetX =
          Math.cos(this.direction + (Math.PI / 4) * 3) * 0.7;
        const engineLoffsetY =
          Math.sin(this.direction + (Math.PI / 4) * 3) * 0.7;
        this.particleEmitter.emit(
          this.position.x + engineLoffsetX,
          this.position.y + engineLoffsetY
        );

        const engineROffsetX =
          Math.cos(this.direction - (Math.PI / 4) * 3) * 0.7;
        const engineROffsetY =
          Math.sin(this.direction - (Math.PI / 4) * 3) * 0.7;

        this.particleEmitter.emit(
          this.position.x + engineROffsetX,
          this.position.y + engineROffsetY
        );
      }
    }

    if (pressedKeys.has("ArrowLeft")) {
      this.direction += turnSpeed * deltaTime;
    } else if (pressedKeys.has("ArrowRight")) {
      this.direction -= turnSpeed * deltaTime;
    }

    if (pressedKeys.has(" ")) {
      this.#shoot();
    }
  }

  #accelerate(deltaTime) {
    const { shipMaxSpeed, shipAcceleration } = this.world.guiConfig;

    const speedX =
      this.speedX + shipAcceleration * deltaTime * Math.cos(this.direction);
    this.speedX = Math.sign(speedX) * Math.min(shipMaxSpeed, Math.abs(speedX));

    const speedY =
      this.speedY + shipAcceleration * deltaTime * Math.sin(this.direction);
    this.speedY = Math.sign(speedY) * Math.min(shipMaxSpeed, Math.abs(speedY));
  }

  #shoot() {
    if (this.bulletTimer === 0) {
      const bullet = new Bullet(
        this.position.x,
        this.position.y,
        this.direction
      );
      this.world.addEntity(bullet);
      this.bulletTimer = bulletDelay;
    }
  }
}
