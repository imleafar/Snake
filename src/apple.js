export class Apple {
  constructor(platform) {
    this.platform = platform;
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
    let x = this.generateCoordinate(this.platform.width / 10);
    let y = this.generateCoordinate(this.platform.height / 10);
    x = x < 20 ? 20 : x;
    y = y < 30 ? 30 : y;
    this.x = x;
    this.y = y;
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