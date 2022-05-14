import { Coords, Size } from "./interfaces";
import { game } from "../main";

class Sprite {
  position: Coords;
  size: Size;
  image!: HTMLImageElement | undefined;
  scale: number;
  offset: Coords;
  framesMax: number;
  framesCurrent: number;
  framesElapsed: number;
  framesHold: number = 12;

  constructor(
    position: Coords,
    imgSrc: string,
    scale: number = 1,
    offset = { x: 0, y: 0 },
    framesMax: number = 1,
    framesCurrent: number,
    framesElapsed: number,
    framesHold: number
  ) {
    this.position = position;
    this.image = new Image();
    if (imgSrc) this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.offset = offset;
    this.framesMax = framesMax;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
  }

  updateSprite(): void {
    this.draw();
    this.animateFrames();
  }

  animateFrames(): void {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  draw(): void {
    if (this.image) {
      game.context.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax), // X
        0, // Y
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      );
    }
  }
}

export { Sprite };
