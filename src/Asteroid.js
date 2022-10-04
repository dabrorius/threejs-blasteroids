import * as THREE from "three";
import { translate } from "./translate";
import textureBaseImage from "./textures/Rock_044_BaseColor.jpg";
import textureNormalImage from "./textures/Rock_044_Normal.jpg";
import textureHeightImage from "./textures/Rock_044_Height.png";

const maxSize = 3;

const textureLoader = new THREE.TextureLoader();
const textureBase = textureLoader.load(textureBaseImage);
const textureNormal = textureLoader.load(textureNormalImage);
const textureHeight = textureLoader.load(textureHeightImage);

const asteroidGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const asteroidMaterial = new THREE.MeshStandardMaterial({
  map: textureBase,
  normalMap: textureNormal,
  displacementMap: textureHeight,
  displacementScale: 0.3,
});

const randomRotationSpeed = () => (Math.random() * Math.PI) / 4 + Math.PI / 8;

export class Asteroid {
  constructor(x, y, size, direction = null) {
    this.size = size;
    this.position = { x, y };
    this.direction =
      direction === null ? Math.PI * 2 * Math.random() : direction;
    this.speed = 1 + (maxSize - size) / 2;

    this.mesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    const scale = size / maxSize;
    this.mesh.scale.multiplyScalar(scale);

    this.hitbox = {
      x,
      y,
      r: scale,
      type: "asteroid",
    };

    this.rotationSpeedX = randomRotationSpeed();
    this.rotationSpeedY = randomRotationSpeed();
  }

  update(deltaTime) {
    this.position = translate(
      this.position,
      this.direction,
      this.speed * deltaTime
    );
    const warpLimit = 10;
    if (this.position.x > warpLimit) {
      this.position.x = -warpLimit;
    }
    if (this.position.x < -warpLimit) {
      this.position.x = warpLimit;
    }
    if (this.position.y > warpLimit) {
      this.position.y = -warpLimit;
    }
    if (this.position.y < -warpLimit) {
      this.position.y = warpLimit;
    }

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.rotation.x += deltaTime * this.rotationSpeedX;
    this.mesh.rotation.y += deltaTime * this.rotationSpeedY;

    this.hitbox.x = this.position.x;
    this.hitbox.y = this.position.y;
  }

  onCollision(collider) {
    if (collider.hitbox.type === "spaceship") {
      this.world.removeEntity(this);
      this.world.removeEntity(collider);
    }

    if (collider.hitbox.type === "bullet") {
      if (this.size > 1) {
        const childSize = this.size - 1;
        const asteroidOne = new Asteroid(
          this.position.x,
          this.position.y,
          childSize
        );
        this.world.addEntity(asteroidOne);
        this.world.addEntity(
          new Asteroid(
            this.position.x,
            this.position.y,
            childSize,
            asteroidOne.direction + Math.PI
          )
        );
      }
      this.world.removeEntity(this);
      this.world.removeEntity(collider);
    }
  }
}
