import { JoyStick } from "./joystick";
import { Direction } from './direction'

export class Snake {
  constructor(platform) {
    this.platform = platform;
    this.width = 10;
    this.height = 10;
    this.imageSnake = new Image();
    this.imageSnake.src = './sprites/spriteSnake.png';
    this.joystick = new JoyStick(this.run.bind(this));
    this.audio = new Audio('./soundEffects/eat.mp3');
    this.default();
    this.animate();
  }

  animate() {
    setInterval(function () {
      this.run();
    }.bind(this), 100);
  }

  default() {
    this.x = 360;
    this.y = 240;
    let cut = { x: 20, y: 10 };
    this.points = [
      { x: this.x, y: this.y, cut, direction: Direction.right },
      { x: this.x - 10, y: this.y, cut, direction: Direction.right },
      { x: this.x - 20, y: this.y, cut, direction: Direction.right }
    ];
    this.joystick.default();
  }

  update() {
    this.draw();
  }

  eat() {
    const lastPoint = this.points[this.points.length - 1];
    let newPoint = {...lastPoint};
    newPoint.x = -10;
    newPoint.y = -10;
    this.points.push(newPoint);
    this.audio.play();
  }

  get wallCollision() {
    return this.x >= this.platform.width
      || this.y >= this.platform.height
      || this.x <= 10
      || this.y <= 20;
  }

  get snakeAteHerself() {
    const coordinate = this.points.map(point => `${point.x}${point.y}`);
    return new Set(coordinate).size !== this.points.length;
  }

  draw() {
    ctx.fillStyle = 'grey';
    this.drawHead();
    this.drawBody();
    this.drawTail();
  }

  drawTail() {
    const tail = this.points[this.points.length - 1];
    const lastLastBody = this.points[this.points.length - 2];

    if (lastLastBody.direction === Direction.right) {
      this.drawImage(50, 0, tail.x, tail.y);
    } else if (lastLastBody.direction === Direction.up) {
      this.drawImage(50, 10, tail.x, tail.y);
    } else if (lastLastBody.direction === Direction.down) {
      this.drawImage(60, 10, tail.x, tail.y);
    } else if (lastLastBody.direction === Direction.left) {
      this.drawImage(60, 0, tail.x, tail.y);
    }
  }

  drawBody() {
    for (let index = 1; index < this.points.length - 1; index++) {
      let pointCurrent = this.points[index];
      this.drawImage(pointCurrent.cut.x, pointCurrent.cut.y, pointCurrent.x, pointCurrent.y);
    }
  }

  drawHead() {
    let headSnake = this.points[0];
    let x = 30;
    let y = 10;
    switch (headSnake.direction) {
      case Direction.up:
        x = 40;
        y = 0;
        break;
      case Direction.right:
        x = 30;
        y = 10;
        break;
      case Direction.down:
        x = 30;
        y = 0;
        break;
      case Direction.left:
        x = 40;
        y = 10;
      break;

      default:
        break;
    }
    this.drawImage(x, y, headSnake.x, headSnake.y);
  }

  drawImage(cutPositionX, cutPositionY, x, y) {
    ctx.drawImage(this.imageSnake,
      cutPositionX, cutPositionY,
      this.width, this.height,
      x, y,
      this.width, this.height);
  }

  run() {
    switch (this.joystick.direction) {
      case Direction.up:
        this.y -= this.height;
        break;
      case Direction.right:
        this.x += this.width;
        break;
      case Direction.down:
        this.y += this.height;
        break;
      case Direction.left:
        this.x -= this.width;
        break;

      default:
        break;
    }
    this.updateCoordinateSnake();
  }

  updateCoordinateSnake() {
    for (let index = this.points.length - 1; index > 0; index--) {
     this.points[index] = {...this.points[index - 1]}
    }
    this.points[0].x = this.x;
    this.points[0].y = this.y;
    this.points[0].direction = this.joystick.direction;
    this.updateAnimation();
  }

  updateAnimation() {
    for (let index = 1; index < this.points.length - 1; index++) {
      let front = this.points[index - 1];
      let current = this.points[index];
      let back = this.points[index + 1];
      if (front.direction === Direction.right
        && back.direction === Direction.right
        && current.direction === Direction.right
        || front.direction === Direction.left
        && current.direction === Direction.left
        && back.direction === Direction.left
        || front.direction === Direction.right
        && back.direction === Direction.up
        && current.direction === Direction.right
        || front.direction === Direction.right
        && back.direction === Direction.down
        && current.direction === Direction.right
        || front.direction === Direction.left
        && back.direction === Direction.up
        && current.direction === Direction.left
        || front.direction === Direction.left
        && back.direction === Direction.down
        && current.direction === Direction.left) {
        current.cut = { x: 20, y: 10 }
      }
      else if (front.direction === Direction.up
        && back.direction === Direction.up
        && current.direction === Direction.up
        || front.direction === Direction.down
        && current.direction === Direction.down
        && back.direction === Direction.down
        || front.direction === Direction.up
        && back.direction === Direction.right
        && current.direction === Direction.up
        || front.direction === Direction.up
        && back.direction === Direction.left
        && current.direction === Direction.up
        || front.direction === Direction.down
        && back.direction === Direction.right
        && current.direction === Direction.down
        || front.direction === Direction.down
        && back.direction === Direction.left
        && current.direction === Direction.down) {
        current.cut = { x: 20, y: 0 }
      }
      else if (front.direction === Direction.down
        && back.direction === Direction.right
        && current.direction !== Direction.down
        || front.direction === Direction.left
        && current.direction === Direction.up
        && back.direction === Direction.left
        || front.direction === Direction.left
        && current.direction === Direction.up
        && back.direction === Direction.up
        || front.direction === Direction.down
        && current.direction === Direction.right
        && back.direction === Direction.down
        || front.direction === Direction.left
        && current.direction == Direction.up
        && back.direction === Direction.right
        || front.direction === Direction.down
        && current.direction == Direction.right
        && back.direction === Direction.up) {
        current.cut = { x: 70, y: 10 }
      }
      else if (
        front.direction === Direction.up
        && back.direction === Direction.right
        && current.direction !== Direction.up
        || front.direction === Direction.left
        && current.direction === Direction.down
        && back.direction === Direction.left
        || front.direction === Direction.left
        && current.direction === Direction.down
        && back.direction === Direction.down
        || front.direction === Direction.up
        && current.direction === Direction.right
        && back.direction === Direction.up
        || front.direction === Direction.left
        && current.direction == Direction.down
        && back.direction === Direction.right
        || front.direction === Direction.up
        && current.direction == Direction.right
        && back.direction === Direction.down) {
        current.cut = { x: 70, y: 0 }
      }
      else if (
        front.direction === Direction.right
        && current.direction === Direction.up
        && back.direction === Direction.up
        || front.direction === Direction.down
        && back.direction === Direction.left
        && current.direction !== Direction.down
        || front.direction === Direction.right
        && current.direction === Direction.up
        && back.direction === Direction.right
        || front.direction === Direction.down
        && current.direction === Direction.left
        && back.direction === Direction.down
        || front.direction === Direction.right
        && current.direction == Direction.up
        && back.direction === Direction.left
        || front.direction === Direction.down
        && current.direction == Direction.left
        && back.direction === Direction.up) {
        current.cut = { x: 80, y: 10 }
      }
      else if (
        front.direction === Direction.up
        && back.direction === Direction.left
        && current.direction !== Direction.up
        || front.direction === Direction.right
        && current.direction === Direction.down
        && back.direction === Direction.right
        || front.direction === Direction.right
        && current.direction === Direction.down
        && back.direction === Direction.down
        || front.direction === Direction.up
        && current.direction === Direction.left
        && back.direction === Direction.up
        || front.direction === Direction.right
        && current.direction == Direction.down
        && back.direction === Direction.left
        || front.direction === Direction.up
        && current.direction == Direction.left
        && back.direction === Direction.down) {
        current.cut = { x: 80, y: 0 }
      }
    }
  }
}