import { Snake } from './snake';
import { Apple } from './apple';
import { Background } from './background';

class Game {
  constructor() {
    window.canvasSnake = document.getElementById('canvasSnake');
    window.ctx = canvasSnake.getContext('2d');
    this.platform = { width: 700, height: 460 };
    this.snake = new Snake(this.platform);
    this.apple = new Apple(this.platform);
    this.background = new Background();
    this.audioImpact = new Audio('./soundEffects/impact.mp3');
    this.update();
    this.score = 0;
  }

  update() {
    this.background.draw();
    this.drawXadrez();
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
      this.audioImpact.play();
    }
  }

  drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.fillText(this.score, 10, 28);
  }

  drawXadrez() {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(168, 122, 79, 1)';
    for (let index = 2; index < (canvasSnake.width / 10) - 1; index++) {
      ctx.moveTo(10 * index, 30);
      ctx.lineTo(10 * index, this.platform.height);
    }
    for (let index = 3; index < (canvasSnake.height / 10) - 1; index++) {
      ctx.moveTo(20, 10 * index);
      ctx.lineTo(this.platform.width, 10 * index);
    }
    ctx.stroke();
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