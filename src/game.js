import { Snake } from './snake';
import { Apple } from './apple';

class Game {
  constructor() {
    window.canvasSnake = document.getElementById('canvasSnake');
    window.ctx = canvasSnake.getContext('2d');
    this.snake = new Snake();
    this.apple = new Apple();
    this.update();
  }

  update() {
    this.background();
    this.snake.update();
    this.apple.update();
    this.snakeEteApple();
    window.requestAnimationFrame(this.update.bind(this));
  }

  snakeEteApple() {
    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      this.snake.eat();
      this.apple.random();
    }
  }

  background() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasSnake.width, canvasSnake.height);
  }
}

new Game();