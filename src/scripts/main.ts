import { GameCanvas } from "./classes/canvas";
import { Fighter } from "./classes/fighter";
import { Sprite } from "./classes/sprite";
//import {Coords} from "./classes/interfaces";

const game = new GameCanvas();
let timer = 10;
let timerId;
const resultElement = document.getElementById("result");
const background = new Sprite({ x: 0, y: 0 }, "../images/backgrounds/background.png", 1, { x: 0, y: 0 }, 1, 0, 0, 100);
const shop = new Sprite({ x: 660, y: 160 }, "../images/objects/shop.png", 2.5, { x: 0, y: 0 }, 6, 0, 0, 24);
const player1 = new Fighter(
  "player1",
  { x: 100, y: 0 },
  { x: 0, y: 0 },
  ["a", "d", "w", "f"],
  "../images/characters/samuraiMack/idle.png",
  2.5,
  { x: 215, y: 157 },
  8,
  0,
  0,
  12,
  {
    attack1: {
      name: "attack1",
      imgSrc: "../images/characters/samuraiMack/attack1.png",
      framesMax: 6,
    },
    attack2: {
      name: "attack2",
      imgSrc: "../images/characters/samuraiMack/attack2.png",
      framesMax: 6,
    },
    idle: {
      name: "idle",
      imgSrc: "../images/characters/samuraiMack/idle.png",
      framesMax: 8,
    },
    run: {
      name: "run",
      imgSrc: "../images/characters/samuraiMack/run.png",
      framesMax: 8,
    },
    jump: {
      name: "jump",
      imgSrc: "../images/characters/samuraiMack/jump.png",
      framesMax: 2,
    },
    fall: {
      name: "fall",
      imgSrc: "../images/characters/samuraiMack/fall.png",
      framesMax: 2,
    },
  }
);
const player2 = new Fighter(
  "player2",
  { x: 800, y: 0 },
  { x: 0, y: 0 },
  ["j", "l", "i", "h"],
  "../images/characters/kenji/idle.png",
  2.5,
  { x: 215, y: 172 },
  4,
  0,
  0,
  16,
  {
    attack1: {
      name: "attack1",
      imgSrc: "../images/characters/kenji/attack1.png",
      framesMax: 4,
    },
    attack2: {
      name: "attack2",
      imgSrc: "../images/characters/kenji/attack2.png",
      framesMax: 4,
    },
    idle: {
      name: "idle",
      imgSrc: "../images/characters/kenji/idle.png",
      framesMax: 4,
    },
    run: {
      name: "run",
      imgSrc: "../images/characters/kenji/run.png",
      framesMax: 8,
    },
    jump: {
      name: "jump",
      imgSrc: "../images/characters/kenji/jump.png",
      framesMax: 2,
    },
    fall: {
      name: "fall",
      imgSrc: "../images/characters/kenji/fall.png",
      framesMax: 2,
    },
  }
);

function decreaseTimer(): void {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.getElementById("countdown").innerHTML = timer.toString();
  } else {
    determineWinner({ player1, player2, timerId });
  }
}

function animate(): void {
  window.requestAnimationFrame(animate);
  game.context.fillStyle = "black";
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
  background.updateSprite();
  shop.updateSprite();
  player1.update(player2);
  player2.update(player1);
  gameEnd();
}

function determineWinner({ player1, player2, timerId }): void {
  clearTimeout(timerId);
  let result = "TODO: fix bug!";
  if (player1.information.health === player2.information.health) result = "!! DRAW !!";
  if (player1.information.health > player2.information.health) result = "Player 1 Wins";
  if (player2.information.health > player1.information.health) result = "Player 2 Wins";
  resultElement.innerHTML = result;
  resultElement.style.display = "flex";
}

function gameEnd(): void {
  if (player1.information.health <= 0 || player2.information.health <= 0) {
    determineWinner({ player1, player2, timerId });
  }
}

function eventListeners(): void {
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
