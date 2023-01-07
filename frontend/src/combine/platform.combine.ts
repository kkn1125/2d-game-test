import { Axis } from "../models/base";
import { Platform } from "../models/platform";
import { Player } from "../models/player";

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
    // this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.platforms.forEach((platform) => platform.moveVertical(value));
    // this.position.y = this.position.y + value;
  }
  draw() {
    console.log(this.platforms);
    this.platforms.forEach((platform) => platform.draw());
  }
  clear() {
    this.platforms = [];
  }
  collision(player: Player) {
    this.platforms.forEach((platform) => platform.collision(player));
  }
}
