import { GameCanvas } from "./canvas";
import { Sprite } from "./sprite";
import { Coords, Size, AttackBox, Information } from "./interfaces.js";

const gameCanvas = new GameCanvas();

class Fighter extends Sprite {
  information: Information;
  isJumping: boolean;
  isAttacking: boolean;
  lastKey: string;
  sprites: any;
  readonly size: Size;
  readonly attackBox: AttackBox;
  readonly keys: any;
  readonly gravity = 0.7;

  constructor(
    name: string,
    position: Coords,
    velocity: Coords,
    controls: any,
    imgSrc: string,
    scale: number = 1,
    offset: Coords,
    framesMax: number = 1,
    framesCurrent: number,
    framesElapsed: number,
    framesHold: number,
    sprites: any
  ) {
    super(position, imgSrc, scale, offset, framesMax, framesCurrent, framesElapsed, framesHold);
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
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  update(target: Fighter): void {
    this.updateSprite();
    this.drawAttackBox();
    this.move();
    this.updatePosition();
    this.collision(target);
  }

  handleKeyDown(eventKey): void {
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

  handleKeyUp(eventKey): void {
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

  drawAttackBox(): void {
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
    if (this.isAttacking) {
      gameCanvas.context.fillStyle = "yellow";
      gameCanvas.context.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.size.width,
        this.attackBox.size.height
      );
    }
  }

  switchSprite(sprite): void {
    if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
      return;
    }

    if (this.image === this.sprites.attack2.image && this.framesCurrent < this.sprites.attack2.framesMax - 1) {
      return;
    }

    switch (sprite) {
      case this.sprites.attack1.name:
        this.framesCurrent = 0;
        this.image = this.sprites.attack1.image;
        this.framesMax = this.sprites.attack1.framesMax;
        break;
      case this.sprites.attack2.name:
        this.framesCurrent = 0;
        this.image = this.sprites.attack2.image;
        this.framesMax = this.sprites.attack2.framesMax;
        break;
      case this.sprites.idle.name:
        this.image = this.sprites.idle.image;
        this.framesMax = this.sprites.idle.framesMax;
        break;
      case this.sprites.run.name:
        this.image = this.sprites.run.image;
        this.framesMax = this.sprites.run.framesMax;
        break;
      case this.sprites.jump.name:
        this.framesCurrent = 0;
        this.image = this.sprites.jump.image;
        this.framesMax = this.sprites.jump.framesMax;
        break;
      case this.sprites.fall.name:
        this.framesCurrent = 0;
        this.image = this.sprites.fall.image;
        this.framesMax = this.sprites.fall.framesMax;
        break;
    }
  }

  private updatePosition(): void {
    this.applyGravity();
    this.applyBounds();
    this.position.y += this.information.velocity.y;
    this.position.x += this.information.velocity.x;
    if (this.position.x + this.information.velocity.x + this.size.width >= gameCanvas.canvas.width) {
      this.information.velocity.x = 0;
    }
  }

  private applyGravity(): void {
    if (this.position.y + this.information.velocity.y + this.size.height >= gameCanvas.canvas.height - 92) {
      this.information.velocity.y = 0;
      this.position.y = 334;
    } else {
      this.information.velocity.y += this.gravity;
    }
  }

  private applyBounds(): void {
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

  private attack(): void {
    this.isAttacking = true;
    this.switchSprite("attack1");
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  private collision(target: Fighter): void {
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

  private move(): void {
    this.information.velocity.x = 0;
    if (this.keys.left.pressed && this.lastKey === this.keys.left.character) {
      this.information.velocity.x = -5;
      this.switchSprite("run");
    } else if (this.keys.right.pressed && this.lastKey === this.keys.right.character) {
      this.information.velocity.x = 5;
      this.switchSprite("run");
    } else {
      this.switchSprite("idle");
    }
    if (this.keys.jump.pressed) {
      this.jump();
    }
    if (this.information.velocity.y < 0) {
      this.switchSprite("jump");
    } else if (this.information.velocity.y > 0) {
      this.switchSprite("fall");
    }
  }

  private jump(): void {
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
