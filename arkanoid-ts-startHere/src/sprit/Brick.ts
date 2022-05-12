import { Vector } from "~/types";

export class Brick {
  private brickImage: HTMLImageElement = new Image()
  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private brickEnery: number,
    private position: Vector,
    image: string
  ) {
    this.brickWidth = brickWidth
    this.brickHeight = brickHeight
    this.brickEnery = brickEnery
    this.position = position
    this.brickImage.src = image
  }
  // 这么做的原因就是 在获得属性的时候可以做一些别的事情
  get width(): number {
    return this.brickWidth
  }

  get height(): number {
    return this.brickHeight
  }

  get enery(): number {
    return this.brickEnery
  }

  get pos(): Vector {
    return this.position
  }

  get image(): HTMLImageElement {
    return this.brickImage
  }

  // 这里是不是设置成 直接减 1
  set enery(num: number) {
    this.brickEnery = num
  }
}