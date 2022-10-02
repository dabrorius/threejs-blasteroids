import * as THREE from "three";
import { translate } from "./translate";

const maxSize = 3;

const asteroidGeometry = new THREE.DodecahedronGeometry(1);
const asteroidMaterial = new THREE.MeshNormalMaterial();

const randomRotationSpeed = () => (Math.random() * Math.PI) / 4 + Math.PI / 8;

export class Asteroid {
  constructor(world, x, y, size, direction = null) {
    this.world = world;
    this.size = size;
    this.position = { x, y };
    this.direction =
      direction === null ? Math.PI * 2 * Math.random() : direction;
    this.speed = 1 + (maxSize - size) / 2;

    this.mesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    const scale = size / maxSize;
    this.mesh.scale.multiplyScalar(scale);

    this.hitbox = {
      x: 0,
      y: 0,
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

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.rotation.x += deltaTime * this.rotationSpeedX;
    this.mesh.rotation.y += deltaTime * this.rotationSpeedY;

    this.hitbox.x = this.position.x;
    this.hitbox.y = this.position.y;
  }

  onCollision(collider) {
    if (collider.hitbox.type === "bullet") {
      if (this.size > 1) {
        const childSize = this.size - 1;
        const asteroidOne = new Asteroid(
          this.world,
          this.position.x,
          this.position.y,
          childSize
        );
        this.world.addEntity(asteroidOne);
        this.world.addEntity(
          new Asteroid(
            this.world,
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
