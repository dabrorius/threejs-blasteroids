import * as THREE from "three";
import { AsteroidFactory } from "./AsteroidFactory";
import { Spaceship } from "./Spaceship";

export class World {
  constructor(scene) {
    this.scene = scene;

    const spaceship = Spaceship(this);
    this.addEntity(spaceship);

    const asteroidFactory = AsteroidFactory(this);
    this.addEntity(
      asteroidFactory({ x: 3, y: 3 }, 3, Math.random() * (Math.PI / 2))
    );
    this.addEntity(
      asteroidFactory({ x: 3, y: -3 }, 3, -Math.random() * (Math.PI / 2))
    );
    this.addEntity(
      asteroidFactory(
        { x: -3, y: -3 },
        3,
        Math.PI + Math.random() * (Math.PI / 2)
      )
    );
    this.addEntity(
      asteroidFactory(
        { x: -3, y: 3 },
        3,
        Math.PI - Math.random() * (Math.PI / 2)
      )
    );
  }

  /**
   * World contains many entities.
   * When an entity is added to a world, its `mesh` property is added to the scene.
   * Whenever world is updated, it calls function within `update` property of each added entity.
   * If entities have `hitbox` property, collicion detection will be runned on them and `onCollision` called.
   */
  entities = new Set();
  entitiesToRemove = [];
  entitiesToAdd = [];

  addEntity(entity) {
    this.entitiesToAdd.push(entity);
  }
  removeEntity(entity) {
    this.entitiesToRemove.push(entity);
  }

  update(deltaTime, pressedKeys) {
    this.#removeScheduledEntities();
    this.#addScheduledEntities();
    this.#checkCollision();

    /**
     * Call update method on all entities
     */
    this.entities.forEach(
      (entity) => entity.update && entity.update(deltaTime, pressedKeys)
    );
  }

  #removeScheduledEntities() {
    this.entitiesToRemove.forEach((entity) => {
      this.entities.delete(entity);
      if (entity.mesh) {
        this.scene.remove(entity.mesh);
      }
    });
    this.entitiesToRemove = [];
  }

  #addScheduledEntities() {
    this.entitiesToAdd.forEach((entity) => {
      this.entities.add(entity);
      if (entity.mesh) {
        this.scene.add(entity.mesh);
      }
    });
    this.entitiesToAdd = [];
  }

  /**
   * We use simple circle collision detection on all entities that have `hitbox` property defined.
   * Each `hitbox` (hitcircle to be more precise) has a position and radius.
   * Square distances are used to avoid expensive square root calculations.
   * Additionally hitboxes contain `type` property to make it easier to figure out what kind of objects are colliding.
   * For example if "bullet" or "spaceship" are colliding with "asteroid".
   */
  #checkCollision() {
    const hitboxEntities = Array.from(this.entities).filter((e) => e.hitbox);

    hitboxEntities.forEach((entityA, entityAIndex) => {
      for (
        let entityBIndex = entityAIndex + 1;
        entityBIndex < hitboxEntities.length;
        entityBIndex++
      ) {
        const entityB = hitboxEntities[entityBIndex];
        const hitboxA = entityA.hitbox;
        const hitboxB = entityB.hitbox;

        const sqDistance =
          Math.pow(hitboxA.x - hitboxB.x, 2) +
          Math.pow(hitboxA.y - hitboxB.y, 2);
        const sqRadiuses = Math.pow(hitboxA.r, 2) + Math.pow(hitboxB.r, 2);

        if (sqDistance < sqRadiuses) {
          if (entityA.onCollision) {
            entityA.onCollision(entityB);
          }
          if (entityB.onCollision) {
            entityB.onCollision(entityA);
          }
        }
      }
    });
  }
}
