import { Axis } from "../models/base";
import { Monster } from "../models/monster";
import { Platform } from "../models/platform";
import { Player } from "../models/player";
import { MonsterCombine } from "./monster.combine";

export class PlatFormCombine {
  imageSource?: HTMLImageElement;
  platforms: Platform[] = [];
  constructor(imageSource?: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  add(platform: Axis | Axis[]) {
    if (platform instanceof Array) {
      for (let pf of platform) {
        this.platforms.push(
          new Platform({
            ...pf,
            image: this.imageSource as HTMLImageElement,
          })
        );
      }
    } else {
      this.platforms.push(
        new Platform({
          ...platform,
          image: this.imageSource as HTMLImageElement,
        })
      );
    }
  }
  setImage(imageSource: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  moveHorizontally(value: number) {
    this.platforms.forEach((platform) => platform.moveHorizontally(value));
  }

  moveVertical(value: number) {
    this.platforms.forEach((platform) => platform.moveVertical(value));
  }
  draw() {
    this.platforms.forEach((platform) => platform.draw());
  }
  clear() {
    this.platforms = [];
  }
  collision(units: (Player | MonsterCombine)[]) {
    // console.log(units);
    this.platforms.forEach((platform) =>
      units.forEach((unit) =>
        unit instanceof MonsterCombine
          ? unit.monsters.forEach((u) => platform.collision(u))
          : platform.collision(unit)
      )
    );
  }
}
