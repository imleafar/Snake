export class Apple {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.random();
  }

  update() {
    this.draw();
  }

  random() {
    this.x = this.generateCoordinate(canvasSnake.width / 10);
    this.y = this.generateCoordinate(canvasSnake.height / 10);
  }

  generateCoordinate(number) {
    return Math.floor(Math.random() * number) * 10;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}