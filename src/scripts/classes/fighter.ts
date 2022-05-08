import { GameCanvas } from "./canvas";
import { Sprite } from "./sprite";
import { Coords, Size, AttackBox, Information } from "./interfaces.js";

const gameCanvas = new GameCanvas();

class Fighter extends Sprite {
  information: Information;
  isJumping;
  lastKey;
  isAttacking;
  readonly size: Size;
  readonly attackBox: AttackBox;
  readonly keys;
  readonly color;
  readonly gravity = 0.7;

  constructor(name: string, position: Coords, velocity: Coords, controls: any, color: string, offset: Coords) {
    super(position);
    this.information = {
      name: name,
      health: 200,
      maxHealth: 200,
      velocity: {
        x: velocity.x,
        y: velocity.y,
      },
      healthBar: document.getElementById(`${name}Health`) as HTMLElement,
    };
    this.size = {
      height: 150,
      width: 50,
    };
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: {
        x: offset.x,
        y: offset.y,
      },
      size: {
        width: 100,
        height: 50,
      },
    };
    this.color = color;
    this.isJumping = false;
    this.isAttacking = false;
    this.keys = {
      left: {
        character: controls[0],
        pressed: false,
      },
      right: {
        character: controls[1],
        pressed: false,
      },
      jump: {
        character: controls[2],
        pressed: false,
      },
      attack: {
        character: controls[3],
      },
    };
  }

  animate(target: Fighter) {
    this.update();
    this.move();
    this.collision(target);
  }

  handleKeyDown(eventKey) {
    switch (eventKey) {
      case this.keys.left.character:
        this.keys.left.pressed = true;
        this.lastKey = eventKey;
        break;
      case this.keys.right.character:
        this.keys.right.pressed = true;
        this.lastKey = eventKey;
        break;
      case this.keys.jump.character:
        this.keys.jump.pressed = true;
        break;
      case this.keys.attack.character:
        this.attack();
        break;
    }
  }

  handleKeyUp(eventKey) {
    switch (eventKey) {
      case this.keys.left.character:
        this.keys.left.pressed = false;
        break;
      case this.keys.right.character:
        this.keys.right.pressed = false;
        break;
      case this.keys.jump.character:
        this.keys.jump.pressed = false;
        break;
    }
  }

  override draw() {
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
    gameCanvas.context.fillStyle = this.color;
    gameCanvas.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    if (this.isAttacking) {
      gameCanvas.context.fillStyle = "yellow";
      gameCanvas.context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.size.width, this.attackBox.size.height);
    }
  }

  override update() {
    this.draw();
    this.updatePosition();
  }

  private updatePosition() {
    this.applyGravity();
    this.applyBounds();
    this.position.y += this.information.velocity.y;
    this.position.x += this.information.velocity.x;
    if (this.position.x + this.information.velocity.x + this.size.width >= gameCanvas.canvas.width) {
      this.information.velocity.x = 0;
    }
  }

  private applyGravity() {
    if (this.position.y + this.information.velocity.y + this.size.height >= gameCanvas.canvas.height) {
      this.information.velocity.y = 0;
    } else {
      this.information.velocity.y += this.gravity;
    }
  }

  private applyBounds() {
    if (this.position.x + this.information.velocity.x + this.size.width >= gameCanvas.canvas.width) {
      this.information.velocity.x = 0;
    }

    if (this.position.x + this.information.velocity.x <= 0) {
      this.information.velocity.x = 0;
    }

    if (this.position.y + this.information.velocity.y <= -150) {
      this.information.velocity.y = 0;
    }
  }

  private attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  private collision(target: Fighter) {
    if (
      this.attackBox.position.x + this.attackBox.size.width >= target.position.x &&
      this.attackBox.position.x <= target.position.x + target.size.width &&
      this.attackBox.position.y + this.attackBox.size.height >= target.position.y &&
      this.attackBox.position.y <= target.position.y + target.size.height &&
      this.isAttacking
    ) {
      this.isAttacking = false;
      target.information.health -= 15;
      target.information.healthBar.style.width = (target.information.health / target.information.maxHealth) * 100 + "%";
    }
  }

  private move() {
    this.information.velocity.x = 0;
    if (this.keys.left.pressed && this.lastKey === this.keys.left.character) {
      this.information.velocity.x = -5;
    }
    if (this.keys.right.pressed && this.lastKey === this.keys.right.character) {
      this.information.velocity.x = 5;
    }
    if (this.keys.jump.pressed) {
      this.jump();
    }
  }

  private jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.information.velocity.y = -20;
      setTimeout(() => {
        this.isJumping = false;
      }, 300);
    }
  }
}

export { Fighter };
