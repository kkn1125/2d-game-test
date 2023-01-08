import { canvas, ctx } from "../util/globals";
import { Stats } from "./stats";

export interface Area {
  width: number;
  height: number;
}

export interface Image {
  image?: HTMLImageElement | Area;
}

export interface Axis {
  x: number;
  y: number;
}

export interface PlayerClass {
  position: Axis;
  velocity: Axis;
}

export interface UnitInfo {
  name: string;
  position: Axis;
  velocity: Axis;
  width: number;
  height: number;
  speed: number;
  jumpped: boolean;
  health: number;
  mana: number;
  maxHealth: number;
  maxMana: number;
  infoBarSize: {
    width: number;
    height: number;
  };
}
export class BaseUnit implements UnitInfo {
  barWidth: number = 50;
  gravity: number = 1;
  position: Axis;
  velocity: Axis;
  width: number;
  height: number;
  speed: number = 5;
  jumpped: boolean = false;
  name: string;
  health: number = 0;
  mana: number = 0;
  maxHealth: number = 0;
  maxMana: number = 0;
  infoBarSize: {
    width: number;
    height: number;
  } = {
    width: 100,
    height: 5,
  };
  stats: Stats = new Stats();
  attacked = false;
  alive = true;
  gradient = 255;

  constructor(
    name: string,
    position: Axis,
    velocity: Axis,
    width: number,
    height: number
  ) {
    this.name = name;
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
  }

  setHealth(health: number, maxHealth: number) {
    this.health = health;
    this.maxHealth = maxHealth;
  }
  setMana(mana: number, maxMana: number) {
    this.mana = mana;
    this.maxMana = maxMana;
  }

  jump() {
    this.velocity.y -= 20;
    this.jumpped = true;
  }

  drawPlayerInfo() {
    if (!!ctx) {
      const healthGauge =
        (this.health / this.maxHealth) * 100 * (this.barWidth / 100);
      const manaGauge =
        (this.mana / this.maxMana) * 100 * (this.barWidth / 100);
      /* health view */
      ctx.fillStyle = "gray";
      ctx.fillRect(
        this.position.x - this.barWidth / 2 + this.width / 2,
        this.position.y - 20,
        this.barWidth,
        this.infoBarSize.height
      );
      ctx.fillStyle = "red";
      ctx.fillRect(
        // center
        this.position.x - this.barWidth / 2 + this.width / 2,
        this.position.y - 20,
        Number.isFinite(healthGauge) ? healthGauge : 0,
        this.infoBarSize.height
      );
      /* mana view */
      ctx.fillStyle = "gray";
      ctx.fillRect(
        this.position.x - this.barWidth / 2 + this.width / 2,
        this.position.y - 15,
        this.barWidth,
        this.infoBarSize.height
      );
      ctx.fillStyle = "blue";
      ctx.fillRect(
        this.position.x - this.barWidth / 2 + this.width / 2,
        this.position.y - 15,
        Number.isFinite(manaGauge) ? manaGauge : 0,
        this.infoBarSize.height
      );
    }
  }
  knockback(target: BaseUnit) {
    if (
      this.position.x + this.width > target.position.x &&
      this.position.x + this.width < target.position.x + target.width / 2
    ) {
      console.log("left");
      this.velocity.x = -10;
      this.velocity.y = -5;
    } else if (
      this.position.x > target.position.x + target.width / 2 &&
      this.position.x < target.position.x + target.width
    ) {
      console.log("right");
      this.velocity.x = 10;
      this.velocity.y = -5;
    } else {
      this.velocity.x = Math.random() > 0.5 ? 10 : -10;
      this.velocity.y = -5;
    }
    // target
  }
  attack(target: BaseUnit) {
    if (this.health === 0) return;
    if (target.health === 0) return;
    if (this.attacked) return;
    console.log(`${this.name}이 ${target.name}을 공격`);
    target.knockback(this);
    target.damaged(this.stats.str);
    if (target.health === 0) {
      target.health = 0;
      // target.die();
    }
    this.attacked = true;
    // this.knockback(target);
    setTimeout(() => {
      this.attacked = false;
    }, 500);
    setTimeout(() => {
      target.velocity.x = 0;
    }, 50);
  }
  damaged(value: number) {
    this.health -= value;
  }
  die() {
    this.alive = false;
    const fadeout = setInterval(() => {
      this.gradient -= 10;
      if (this.gradient <= 0) {
        this.gradient = 0;
        clearInterval(fadeout);
      }
    }, 16);
  }
  draw() {
    if (!!ctx && this.gradient > 0) {
      this.drawPlayerInfo();
      ctx.fillStyle = `#000000${this.gradient.toString(16)}`;
      if (this.gradient === 0) {
        ctx.fillStyle = `#00000000`;
      }
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name,
        this.position.x + this.width / 2,
        this.position.y - 25
      );
      if (this.health === 0 && this.alive) {
        this.die();
      }
    }
  }
  update() {
    this.draw();
    if (this.name === "slime") {
      // console.log(this.name, this.velocity.y);
      // console.log(
      //   this.position.y + this.height + this.velocity.y,
      //   canvas.height
      // );
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    /* gravity setting */
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    }
    //  else {
    //   this.velocity.y = 0;
    // }
  }
}
