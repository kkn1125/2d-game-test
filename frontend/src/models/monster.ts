import { canvas, scrollOptions } from "../util/globals";
import { Axis, BaseUnit, UnitInfo } from "./base";
import { Stats } from "./stats";

const location = {
  range: 500,
  current: 0,
  direction: 0,
};

export class Monster extends BaseUnit implements UnitInfo {
  gravity: number = 1;
  position: Axis;
  velocity: Axis;
  width: number;
  height: number;
  speed: number = 5;
  stats: Stats = new Stats({ str: 1, dex: 0, int: 0, lux: 0, speed: 2 });
  constructor(
    name: string = "noename",
    position: Axis,
    size: number,
    health?: number,
    mana?: number
  ) {
    super(
      name,
      position || {
        x: 100,
        y: 100,
      },
      {
        x: 0,
        y: 0,
      },
      size,
      size
    );
    this.position = position || {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = size;
    this.height = size;
    health && (this.health = health);
    mana && (this.mana = mana);
    health && (this.maxHealth = health);
    mana && (this.maxMana = mana);
  }

  moveHorizontally(value: number) {
    this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.position.y = this.position.y + value;
  }

  aiMove(time: number) {
    // if()
    location.direction = Math.cos(time) > 0 ? 0 : 1;
    // console.log(Math.cos(time));

    // console.log(Math.cos(time));
    // console.log(location.direction, parseInt(time.toString()));
    if (location.direction) {
       this.velocity.x = this.speed;
    } else {
       this.velocity.x = -this.speed;
    }
    // if (location.direction) {
    // }
  }

  boundaryCollision() {
    if (this.position.x + scrollOptions.scrollOffset < 0) {
      this.velocity.x = 0;
    } else if (
      this.position.x -
        this.width +
        scrollOptions.scrollOffset -
        scrollOptions.windowRightLimit >
      scrollOptions.mapEnd
    ) {
      this.velocity.x = 0;
    }
    // if (
    //   location.direction === 1 &&
    //   this.position.x < scrollOptions.windowRightLimit
    // ) {
    //   this.velocity.x = this.stats.speed;
    // } else if (
    //   (location.direction === 0 &&
    //     this.position.x > scrollOptions.windowLeftLimit) ||
    //   (location.direction === 0 &&
    //     scrollOptions.scrollOffset === 0 &&
    //     this.position.x > 0)
    // ) {
    //   this.velocity.x = -this.stats.speed;
    // } else {
    //   this.velocity.x = 0;
    // }
  }
}
