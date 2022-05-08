import { Coords, Size } from "./interfaces";

class Sprite {
  position: Coords;
  size: Size;

  constructor(position: Coords) {
    this.position = position;
    this.size = {
      height: 150,
      width: 50,
    };
  }

  animate(target) {
    this.update();
  }

  draw() {}

  update() {
    this.draw();
  }
}

export { Sprite };
