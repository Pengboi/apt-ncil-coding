import { Entity } from './entity';
import { Camera } from './camera';

export class Scene {
  entities: Entity[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  update(dt: number, player?: Entity) {
    this.entities.forEach((e) => {
      if ('update' in e && typeof e.update === 'function') {
        if (player && 'chaseRange' in e) {
          // Enemy update with player reference
          (e as any).update(dt, player);
        } else {
          // Regular entity update
          e.update(dt);
        }
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    this.entities.forEach((e) => e.draw(ctx, camera));
  }

  getAliveEntities(): Entity[] {
    return this.entities.filter((e) => e.isAlive());
  }
}
