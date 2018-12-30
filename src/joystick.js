export class JoyStick {
  constructor(callBackSnake) {
    this.up = 0;
    this.right = 1;
    this.down = 2;
    this.left = 3;
    this.keyCode = { w: 87, d: 68, s: 83, a: 65 };
    window.addEventListener('keydown', (event) => this.keyboard(event));
    this.default();
    this.callBackSnake = () => callBackSnake();
  }

  default() {
    this.direction = this.right;
  }

  keyboard(event) {
    if (this.keyIsBack(event)) return;

    switch (event.keyCode) {
      case this.keyCode.w:
        this.direction = this.up;
        break;
      case this.keyCode.d:
        this.direction = this.right;
        break;
      case this.keyCode.s:
        this.direction = this.down;
        break;
      case this.keyCode.a:
        this.direction = this.left;
        break;

      default:
        break;
    }
    this.callBackSnake();
  }

  keyIsBack(event) {
    return this.direction === this.right && event.keyCode === this.keyCode.a ||
      this.direction === this.left && event.keyCode === this.keyCode.d ||
      this.direction === this.up && event.keyCode === this.keyCode.s ||
      this.direction === this.down && event.keyCode === this.keyCode.w;
  }
}