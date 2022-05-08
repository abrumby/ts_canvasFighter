interface Coords {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface AttackBox {
  position: Coords;
  size: Size;
  offset: Coords;
}

interface Information {
  name: string;
  health: number;
  velocity: Coords;
  maxHealth: number;
  healthBar: HTMLElement;
}

export { Coords, Size, AttackBox, Information };
