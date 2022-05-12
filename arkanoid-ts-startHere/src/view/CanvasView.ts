import { Ball } from "~/sprit/Ball"
import { Brick } from "~/sprit/Brick"
import { Paddle } from "~/sprit/Paddle"

export class CanvasView {
  canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D | null
  private start: HTMLObjectElement | null
  private score: HTMLObjectElement | null
  private info: HTMLObjectElement | null
  
  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.start = document.querySelector('#start')
    this.score = document.querySelector('#score')
    this.info = document.querySelector('#info')
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawInfo(text: string): void {
    if (this.info) this.info.innerHTML = text
  }

  drawScore(score: number): void {
    if (this.score) this.score.innerHTML = score.toString()
  }

  initStart(startFunc: (view: CanvasView) => void): void {
    // 箭头函数不改变this 的指向
    this.start?.addEventListener('click', () => startFunc(this))
  }

  drawSpirit(spirit: Brick | Paddle | Ball) {
    this.context?.drawImage(
      spirit.image,
      spirit.pos.x,
      spirit.pos.y,
      spirit.width,
      spirit.height
    )
  }

  // 砖块是多个所以有过一个单独的方法
  drawBricks(braicks: Brick[]) {
    braicks.forEach((brick) => { this.drawSpirit(brick) })
  }
}