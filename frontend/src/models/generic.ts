import { ctx } from "../util/globals";
import { Area, Axis, Image } from "./base";
import { PlatformClass } from "./platform";

export class GenericObject implements PlatformClass, Area, Image {
  position: Axis;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor({ x, y, image }: Axis & Image) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
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
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }
}
