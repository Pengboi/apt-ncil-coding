export class Camera {
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;

  constructor(viewportWidth: number, viewportHeight: number) {
    this.width = viewportWidth;
    this.height = viewportHeight;
  }

  follow(target: { x: number; y: number }) {
    this.x = target.x - this.width / 2;
    this.y = target.y - this.height / 2;
  }

  screenToWorld(screenX: number, screenY: number) {
    return {
      x: screenX + this.x,
      y: screenY + this.y,
    };
  }
}
