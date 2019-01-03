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
    this.score = 0;
  }

  update() {
    this.background.draw();
    this.drawScore();
    this.snake.update();
    this.apple.update();
    this.snakeEteApple();
    this.gameOver();
    window.requestAnimationFrame(this.update.bind(this));
  }

  gameOver() {
    if (this.snake.wallCollision || this.snake.snakeAteHerself) {
      this.snake.default();
      this.score = 0;
    }
  }

  drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText(this.score, 10, 50);
  }

  snakeEteApple() {
    const samePosition = this.snake.x === this.apple.x && this.snake.y === this.apple.y;
    if (samePosition) {
      this.score++;
      this.snake.eat();
      this.apple.random();
    }
  }
}

new Game();