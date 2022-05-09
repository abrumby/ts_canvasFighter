import { Coords, Size } from "./interfaces";
import { game } from "../main";

class Sprite {
  position: Coords;
  size: Size;
  image!: HTMLImageElement | undefined;

  constructor(position: Coords, imgSrc: string) {
    this.position = position;
    this.size = {
      height: 150,
      width: 50,
    };
    this.image = new Image();
    if (imgSrc) this.image.src = imgSrc;
  }

  animate(target) {
    this.update();
  }

  draw() {
    if (this.image) {
      game.context.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  update() {
    this.draw();
  }
}

export { Sprite };
