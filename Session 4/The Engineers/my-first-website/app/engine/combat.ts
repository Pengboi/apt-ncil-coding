export interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
  damage: number;
}

export function createHitbox(x: number, y: number, width: number, height: number, damage: number): Hitbox {
  return { x, y, width, height, damage };
}

export function checkOverlap(rect1: Hitbox, rect2: { x: number; y: number; width: number; height: number }): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export interface StatusEffect {
  type: string;
  duration: number;
  power: number;
}

export function createStatusEffect(type: string, duration: number, power: number): StatusEffect {
  return { type, duration, power };
}
