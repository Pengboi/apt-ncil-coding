export interface MouseState {
  x: number;
  y: number;
  clicked: boolean;
}

export const Input = {
  keys: {} as { [key: string]: boolean },
  mouse: { x: 0, y: 0, clicked: false } as MouseState,

  init() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mousedown', () => {
      this.mouse.clicked = true;
    });
    window.addEventListener('mouseup', () => {
      this.mouse.clicked = false;
    });
  },

  isKeyPressed(key: string): boolean {
    return this.keys[key.toLowerCase()] || false;
  },

  reset() {
    this.keys = {};
    this.mouse.clicked = false;
  },
};
