declare interface Position {
  x: number;
  y: number;
}
declare interface Size {
  width: number;
  height: number;
}

declare interface Velocity {
  x: number;
  y: number;
}

declare interface HpMp {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
}

declare interface StatOption {
  str: number;
  dex: number;
  int: number;
  luc: number;
}

declare interface BaseOption {
  name: string;
  position: Position;
}
declare interface BaseMethod {
  draw: (time: number) => void;
  offset: () => void;
}

declare interface UnitProperty extends BaseOption {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  size: Size;
  velocity: Velocity;
  stat: Stat;
  scrollOffset: number;
  speed: number;
  jumpped: boolean;
}
declare interface UnitMethod extends BaseMethod {
  move: (value: number) => void;
  attack: (target: BaseUnit) => void;
  die: () => void;
  jump: () => void;
}

declare interface ObjectProperty extends BaseOption {
  source?: HTMLImageElement | Size;
}
declare interface ObjectMethod extends BaseMethod {}
