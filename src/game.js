import { Snake } from './snake';
import { Apple } from './apple';
import { Background } from './background';

class Game {
  constructor() {
    window.canvasSnake = document.getElementById('canvasSnake');
    window.ctx = canvasSnake.getContext('2d');
    this.snake = new Snake();
    this.apple = new Apple();
    this.background = new Background();
    this.update();
  }

  update() {
    this.background.draw();
    this.snake.update();
    this.apple.update();
    this.snakeEteApple();
    window.requestAnimationFrame(this.update.bind(this));
  }

  snakeEteApple() {
    const samePosition = this.snake.x === this.apple.x && this.snake.y === this.apple.y;
    if (samePosition) {
      this.snake.eat();
      this.apple.random();
    }
  }
}

new Game();