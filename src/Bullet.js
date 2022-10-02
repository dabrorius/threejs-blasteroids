import * as THREE from "three";
import { translate } from "./translate";

const bulletGeometry = new THREE.DodecahedronGeometry(0.1);
const bulletMaterial = new THREE.MeshNormalMaterial();

export class Bullet {
  constructor(x, y, direction) {
    this.position = { x, y };
    this.direction = direction;
    this.speed = 40;

    this.mesh = new THREE.Mesh(bulletGeometry, bulletMaterial);

    this.hitbox = {
      x: 0,
      y: 0,
      r: 0.1,
      type: "bullet",
    };
  }

  update(deltaTime) {
    this.position = translate(
      this.position,
      this.direction,
      this.speed * deltaTime
    );

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;

    this.hitbox.x = this.position.x;
    this.hitbox.y = this.position.y;
  }
}
