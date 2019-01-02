export class Background {
  constructor() {
    this.imageSand = new Image();
    this.imageSand.src = './sprites/spriteSnake.png';
    this.width = 15;
    this.height = 20;
  }

  draw() {
    this.insertSolidColor();
    this.insertFloorPlan();
    this.insertImageAtAll();
  }

  insertFloorPlan() {
    ctx.fillStyle = '#80be1f';
    ctx.fillRect(0, 0, canvasSnake.width, 25);
    ctx.fillStyle = '#93d924';
    ctx.fillRect(0, 0, canvasSnake.width, 5);
  }

  insertImageAtAll() {
    const countPositionX = canvasSnake.width / 10;
    const countPositionY = canvasSnake.height / 10;
    for (let y = 1; y < countPositionY; y++) {
      for (let x = 0; x < countPositionX; x++) {
        ctx.drawImage(this.imageSand, this.width * x, this.height * y);
      }
    }
  }

  insertSolidColor() {
    ctx.fillStyle = '#C58F5C';
    ctx.fillRect(0, 0, canvasSnake.width, canvasSnake.height);
  }
}