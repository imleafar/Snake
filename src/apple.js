export class Apple {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.imageApple = new Image();
    this.imageApple.src = './sprites/spriteSnake.png';
    this.cutImageAppleX = 90;
    this.cutImageAppleY = 0;
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
    ctx.drawImage(this.imageApple,
      this.cutImageAppleX, this.cutImageAppleY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height);
  }
}