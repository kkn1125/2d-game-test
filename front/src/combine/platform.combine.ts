import { Platform } from "../model/object/platform";

export class PlatformCombine implements BaseMethod {
  platforms: Platform[] = [];

  constructor(platform?: Platform | Platform[]) {
    if (platform) {
      if (platform instanceof Array) {
        this.platforms = this.platforms.concat(platform);
      } else {
        this.platforms.push(platform);
      }
    }
  }

  add(platform: Platform | Platform[]) {
    if (platform instanceof Array) {
      this.platforms = this.platforms.concat(platform);
    } else {
      this.platforms.push(platform);
    }
  }

  clear() {
    this.platforms = [];
  }

  draw() {
    this.platforms.forEach((platform) => platform.draw());

  }
  offset() {}
  collision() {
    this.platforms.forEach((platform) => platform.collision());
  }
}
