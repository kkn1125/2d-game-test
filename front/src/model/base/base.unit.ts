import { canvas, ctx } from "../../util/global";
import { Base } from "./base";
import { Stat } from "./base.stat";

export interface Keys {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
  shift: boolean;
  e: boolean;
  " ": boolean;
}

export class BaseUnit extends Base implements UnitProperty, UnitMethod {
  lastDir = true;
  name: string = "noname";
  gravity: number = 1;
  velocity: Velocity = {
    x: 0,
    y: 0,
  };
  origin = {
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
    " ": false,
  };
  position: Position = { x: 0, y: 0 };
  size: Size = { width: 0, height: 0 };
  scrollOffset: number = 0;
  jumpped: boolean = false;
  constructor(name: string, hpmp: HpMp, position: Position, size: Size) {
    super();
    name && (this.name = name);
    position && (this.position = position);
    size && (this.size = size);
    if (hpmp) {
      this.hp = hpmp.hp;
      this.maxHp = hpmp.maxHp;
      this.mp = hpmp.mp;
      this.maxMp = hpmp.maxMp;
    }

    Object.assign(this.origin, position);
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      if (
        key == "a" ||
        key === "w" ||
        key === "d" ||
        key === "s" ||
        key === " "
      ) {
        this.keys[key] = true;
        if (key === "a") this.lastDir = true;
        if (key === "d") this.lastDir = false;
      }
    });
    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();

      if (
        key == "a" ||
        key === "w" ||
        key === "d" ||
        key === "s" ||
        key === " "
      ) {
        this.keys[key] = false;
      }
    });
  }
  hp: number = 0;
  maxHp: number = 0;
  mp: number = 0;
  maxMp: number = 0;
  stat: Stat = new Stat();
  speed: number = 5;
  tans: { str: number; speed: number }[] = [];
  offset() {}
  shoot() {
    this.tans.push({ str: 1, speed: 1 });
  }
  move(value: number) {
    this.velocity.x = value;
    this.position.x += this.velocity.x;
  }
  attack(target: BaseUnit) {
    target.hp -= this.stat.str;
  }
  die() {
    this.hp = 0;
  }
  jump() {
    if (!this.jumpped) {
      this.velocity.y = -15;
      this.position.y += this.velocity.y;
      this.jumpped = true;
    }
  }
  updateMove() {
    if (this.keys.a) this.move(-this.speed);
    if (this.keys.d) this.move(this.speed);
    if (this.keys.w) this.jump();
    // if (this.keys[" "]) this.shoot(); // TODO: shoot 기능 구현
    if (
      this.jumpped &&
      this.position.y + this.size.height >= canvas.height - 100
    ) {
      this.jumpped = false;
    }
    this.velocity.x = 0;
  }
  updateGravity() {
    if (
      this.velocity.y + this.size.height + this.position.y <
      canvas.height - 100
    ) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
    this.position.y += this.velocity.y;
  }
  slideMove() {
    if (this.keys.a || this.keys.d) {
      if (this.keys.a) {
        this.velocity.x += 1;
      } else if (this.keys.d) {
        this.velocity.x -= 1;
      } else {
        if (this.velocity.x === 0) {
          this.velocity.x = 0;
        }
      }
    }
  }
  update(time: number) {
    this.updateMove();
    this.slideMove();
    this.updateGravity();
  }
  draw(time: number) {
    // this.tans.forEach((t) =>
    //   ctx.fillRect(
    //     (this.lastDir ? this.position.x : this.position.x + this.size.width) +
    //       time * 0.1,
    //     this.position.y - this.size.height,
    //     20,
    //     20
    //   )
    // );
    this.update(time);
    ctx.fillStyle = this.color + this.opacity.toString(16);
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.textAlign = "center";
    ctx.fillText(
      this.name,
      this.position.x + this.size.width / 2,
      this.position.y - 10
    );
  }
}
