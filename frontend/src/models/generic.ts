import { ctx } from "../util/globals";
import { Area, Axis, Image } from "./base";
import { PlatformClass } from "./platform";

type CombineImageAxis = Axis & Image;
export class GenericObject implements PlatformClass, Area, Image {
  position: Axis;
  width!: number;
  height!: number;
  image?: HTMLImageElement | Area;

  constructor({ x, y, image }: CombineImageAxis) {
    this.position = {
      x: x,
      y: y,
    };

    if (image instanceof HTMLImageElement) {
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    } else if (image) {
      this.width = image.width;
      this.height = image.height;
    }
  }

  moveHorizontally(value: number) {
    this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.position.y = this.position.y + value;
  }

  draw() {
    if (!!ctx) {
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      if (this.image instanceof HTMLImageElement) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
      } else {
        ctx.fillRect(this.position.x, this.position.y, 200, 300);
      }
    }
  }
}
