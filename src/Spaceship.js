import * as THREE from "three";
import { Bullet } from "./Bullet";
import textureImage from "./textures/8.png";

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(textureImage);

const shipGeomtery = new THREE.ConeGeometry(0.3, 1, 8);
const shipMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

const bulletDelay = 0.1;
const turnSpeed = Math.PI;

export class Spaceship {
  constructor() {
    this.mesh = new THREE.Mesh(shipGeomtery, shipMaterial);

    this.bulletTimer = 0;
    this.position = { x: 0, y: 0 };
    this.speedX = 0;
    this.speedY = 0;
    this.direction = 0;

    this.hitbox = {
      x: 0,
      y: 0,
      r: 0.5,
      type: "spaceship",
    };
  }

  update(deltaTime, pressedKeys) {
    this.bulletTimer = Math.max(0, this.bulletTimer - deltaTime);

    this.position.x += deltaTime * this.speedX;
    this.position.y += deltaTime * this.speedY;

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.rotation.z = this.direction - Math.PI / 2;

    this.hitbox.x = this.position.x;
    this.hitbox.y = this.position.y;

    if (pressedKeys.has("ArrowUp")) {
      this.#accelerate(deltaTime);
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
