import { Coords, Size } from "./interfaces";
import { game } from "../main";

const hold = 6;

class Sprite {
  position: Coords;
  size: Size;
  image!: HTMLImageElement | undefined;
  scale: number;
  frames: number;
  current: number = 0;
  offset: Coords = { x: 0, y: 0 };
  elapsed: number = 0;

  constructor(position: Coords, imgSrc: string, scale: number = 1, frames: number = 1) {
    this.position = position;
    this.image = new Image();
    this.scale = scale;
    this.frames = frames;
    if (imgSrc) this.image.src = imgSrc;
  }

  animate(target) {
    this.update();
  }

  draw() {
    if (this.image) {
      game.context.drawImage(
        this.image,
        this.current * (this.image.width / this.frames), // X
        0, // Y
        this.image.width / this.frames,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.frames) * this.scale,
        this.image.height * this.scale
      );
    }
  }

  update() {
    this.draw();
    this.elapsed++;
    if (this.elapsed % hold === 0) {
      this.current < this.frames - 1 ? this.current++ : (this.current = 0);
    }
  }
}

export { Sprite };
