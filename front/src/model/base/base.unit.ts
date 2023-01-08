import { ctx } from "../../util/global";
import { Stat } from "./base.stat";

export interface Keys {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
  shift: boolean;
  e: boolean;
}

export class BaseUnit implements UnitProperty, UnitMethod {
  name: string = "noname";
  velocity: Velocity = {
    x: 0,
    y: 0,
  };
  color: string = "#000000";
  opacity: number = 255;
  keys: Keys = {
    w: false,
    s: false,
    a: false,
    d: false,
    e: false,
    shift: false,
  };
  position: Position = { x: 0, y: 0 };
  size: Size = { width: 0, height: 0 };
  scrollOffset: number = 0;
  jumpped: boolean = false;
  constructor(name: string, hpmp: HpMp, position: Position, size: Size) {
    name && (this.name = name);
    position && (this.position = position);
    size && (this.size = size);
    if (hpmp) {
      this.hp = hpmp.hp;
      this.maxHp = hpmp.maxHp;
      this.mp = hpmp.mp;
      this.maxMp = hpmp.maxMp;
    }
  }
  hp: number = 0;
  maxHp: number = 0;
  mp: number = 0;
  maxMp: number = 0;
  stat: Stat = new Stat();
  speed: number = 5;
  offset() {}
  move(value: number) {
    this.velocity.x = value;
  }
  attack(target: BaseUnit) {
    target.hp -= this.stat.str;
  }
  die() {
    this.hp = 0;
  }
  jump() {
    this.velocity.y = -20;
  }
  draw() {
    ctx.fillStyle = this.color + this.opacity.toString(16);
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}
