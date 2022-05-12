import { Vector } from "~/types";

export class Ball {
  private ballImage: HTMLImageElement = new Image()
  private speed: Vector;
  constructor(
    private ballSize: number,
    private position: Vector,
    speed: number,
    image: string
  ) {
    this.ballSize = ballSize
    this.position = position
    this.speed = {
      x: speed,
      y: -speed
    }
    this.ballImage.src = image
  }

  get width() {
    return this.ballSize
  }

  get height() {
    return this.ballSize
  }

  get pos() {
    return this.position
  }

  get image() { 
    return this.ballImage
  }
  // Methods
  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }

  moveBall(): void {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}