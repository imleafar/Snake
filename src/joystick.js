import { Direction } from './direction'

export class JoyStick {
  constructor(callBackSnake) {
    this.keyCode = { w: 87, d: 68, s: 83, a: 65 };
    window.addEventListener('keydown', (event) => this.keyboard(event));
    this.default();
    this.callBackSnake = () => callBackSnake();
  }

  default() {
    this.direction = this.right;
    this.init = false;
  }

  keyboard(event) {
    this.init = true;
    if (this.keyIsBack(event)) return;

    switch (event.keyCode) {
      case this.keyCode.w:
        this.direction = Direction.up;
        break;
      case this.keyCode.d:
        this.direction = Direction.right;
        break;
      case this.keyCode.s:
        this.direction = Direction.down;
        break;
      case this.keyCode.a:
        this.direction = Direction.left;
        break;

      default:
        break;
    }
    this.callBackSnake();
  }

  keyIsBack(event) {
    return this.direction === Direction.right && event.keyCode === this.keyCode.a ||
      this.direction === Direction.left && event.keyCode === this.keyCode.d ||
      this.direction === Direction.up && event.keyCode === this.keyCode.s ||
      this.direction === Direction.down && event.keyCode === this.keyCode.w;
  }
}