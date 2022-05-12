import { BRICK_HEIGHT, BRICK_IMAGES, BRICK_WIDTH, BRICK_ENERGY, LEVEL, STAGE_COLS, STAGE_PADDING, BRICK_PADDING } from "./setup"
import { Brick } from "./sprit/Brick";

export function createBricks() {
  return LEVEL.reduce((ack, elememt, i) => {

    if (elememt == 0) return ack

    const col = i % STAGE_COLS
    const row = Math.floor((i + 1) / STAGE_COLS)

    const x = STAGE_PADDING + col * (BRICK_PADDING + BRICK_WIDTH)
    const y = STAGE_PADDING + row * (BRICK_PADDING + BRICK_HEIGHT)

    return [
      ...ack,
      new Brick(BRICK_WIDTH, BRICK_HEIGHT, BRICK_ENERGY[elememt], { x, y }, BRICK_IMAGES[elememt])
    ]
  }, [] as Brick[])
}