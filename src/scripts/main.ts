import { GameCanvas } from "./classes/canvas";
import { Fighter } from "./classes/fighter";
import { Sprite } from "./classes/sprite";
//import {Coords} from "./classes/interfaces";

const game = new GameCanvas();
let timer = 20;
let timerId;
const resultElement = document.getElementById("result");
const background = new Sprite({ x: 0, y: 0 }, "../images/backgrounds/background.png");
const player1 = new Fighter(
  "player1",
  { x: 100, y: 0 },
  { x: 0, y: 0 },
  ["a", "d", "w", "f"],
  "red",
  {
    x: 0,
    y: 0,
  },
  ""
);
const player2 = new Fighter(
  "player2",
  { x: 800, y: 0 },
  { x: 0, y: 0 },
  ["j", "l", "i", "h"],
  "green",
  {
    x: 50,
    y: 0,
  },
  ""
);

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer.toString();
  } else {
    determineWinner({ player1, player2, timerId });
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  game.context.fillStyle = "black";
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
  background.update();
  player1.animate(player2);
  player2.animate(player1);
  gameEnd();
}

function determineWinner({ player1, player2, timerId }) {
  clearTimeout(timerId);
  let result = "TODO: fix bug!";
  if (player1.information.health === player2.information.health) result = "!! DRAW !!";
  if (player1.information.health > player2.information.health) result = "Player 1 Wins";
  if (player2.information.health > player1.information.health) result = "Player 2 Wins";
  resultElement.innerHTML = result;
  resultElement.style.display = "flex";
}

function gameEnd() {
  if (player1.information.health <= 0 || player2.information.health <= 0) {
    determineWinner({ player1, player2, timerId });
  }
}

function eventListeners() {
  window.addEventListener("keydown", (event) => {
    player1.handleKeyDown(event.key);
    player2.handleKeyDown(event.key);
  });

  window.addEventListener("keyup", (event) => {
    player1.handleKeyUp(event.key);
    player2.handleKeyUp(event.key);
  });
}

animate();
eventListeners();
decreaseTimer();

export { game };
