// Start here
// console.log("Start here!");

import { createBricks } from "./helpers";
import { BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_STARTX, PADDLE_WIDTH, STAGE_PADDING } from "./setup";
import { Brick } from "./sprit/Brick";
import { Paddle } from "./sprit/Paddle";
import { CanvasView } from "./view/CanvasView";
// Images
import PADDLE_IMAGE from './images/paddle.png';
import { Ball } from "./sprit/Ball";
import BALL_IMAGE from "./images/ball.png"
import { Collision } from "./Collison";
const canvas = new CanvasView("#playField")
let score = 0

let gameOver = false;
function setGameOver(view: CanvasView) {
  view.drawInfo('Game Over!');
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo('Game Won!');
  gameOver = false;
}

function startGame(view: CanvasView) {
  // console.log('开始游戏');
  score = 0
  view.drawInfo('')

  const bricks = createBricks()
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    { x: PADDLE_STARTX, y: view.canvas.height - STAGE_PADDING - 5 - PADDLE_HEIGHT },
    PADDLE_IMAGE
  )

  const ball = new Ball(BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_SPEED, BALL_IMAGE)
  gameLoop(view, bricks, paddle, ball)
}

function gameLoop(view: CanvasView, bricks: Brick[], paddle: Paddle, ball: Ball) {
  view.clear()

  view.drawScore(score)
  view.drawBricks(bricks)
  view.drawSpirit(paddle)
  view.drawSpirit(ball)

  ball.moveBall()
  const collison = new Collision()
  collison.checkBallCollision(ball, paddle, view)
  const collidingBrick = collison.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  // Game Over when ball leaves playField
  if (ball.pos.y > view.canvas.height) gameOver = true;
  // If game won, set gameOver and display win
  if (bricks.length === 0) return setGameWin(view);
  // Return if gameover and don't run the requestAnimationFrame
  if (gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball));
}
canvas.initStart(startGame)