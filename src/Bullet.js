import * as THREE from "three";
import { DirectionalMovement } from "./traits/DirectionalMovement";

const bulletGeometry = new THREE.DodecahedronGeometry(0.1);
const bulletMaterial = new THREE.MeshNormalMaterial();

export class Bullet {
  constructor(x, y, direction) {
    this.position = { x, y };
    this.direction = direction;

    this.movement = DirectionalMovement(this.position, false);
    this.movement.setSpeed(30);
    this.movement.setDirection(direction);

    this.mesh = new THREE.Mesh(bulletGeometry, bulletMaterial);

    this.hitbox = {
      x: 0,
      y: 0,
      r: 0.1,
      type: "bullet",
    };
  }

  update(deltaTime) {
    const position = this.movement.update(deltaTime);

    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;

    this.hitbox.x = position.x;
    this.hitbox.y = position.y;
  }
}
