import { JoyStick } from "./joystick";

export class Snake {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.joystick = new JoyStick(this.run.bind(this));
    this.audio = new Audio('./soundEffects/eat.mp3');
    this.default();
    setInterval(function () {
      this.run();
      this.gameOver();
    }.bind(this), 100);
  }

  default() {
    this.x = 360;
    this.y = 240;
    this.points = [
      { x: this.x, y: this.y },
      { x: this.x - 10, y: this.y },
      { x: this.x - 20, y: this.y }];
    this.joystick.default();
  }

  update() {
    this.draw();
  }

  eat() {
    let lastPoint = this.points[this.points.length - 1];
    this.points.push({ x: lastPoint.x - 10, y: lastPoint.y });
    this.audio.play();
  }

  gameOver() {
    if (this.wallCollision || this.snakeAteHerself) {
      this.default();
    }
  }

  get wallCollision() {
    return this.x > canvasSnake.width
      || this.y > canvasSnake.height
      || this.x < 0
      || this.y < 0;
  }

  get snakeAteHerself() {
    const coordinate = this.points.map(point => `${point.x}${point.y}`);
    return new Set(coordinate).size !== this.points.length;
  }

  draw() {
    ctx.fillStyle = 'grey';
    for (let index = 0; index < this.points.length; index++) {
      ctx.fillRect(this.points[index].x, this.points[index].y, this.width, this.height);
    }
  }

  run() {
    switch (this.joystick.direction) {
      case this.joystick.up:
        this.y -= 10;
        break;
      case this.joystick.right:
        this.x += 10;
        break;
      case this.joystick.down:
        this.y += 10;
        break;
      case this.joystick.left:
        this.x -= 10;
        break;

      default:
        break;
    }
    this.updateCoordinateSnake();
  }

  updateCoordinateSnake() {
    for (let index = this.points.length - 1; index > 0; index--) {
      this.points[index].x = this.points[index - 1].x;
      this.points[index].y = this.points[index - 1].y;
    }
    this.points[0].x = this.x;
    this.points[0].y = this.y;
  }
}