class GameCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    let canvas = document.getElementById("game") as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.canvas = canvas;
    this.context = context;
  }
}

export { GameCanvas };
