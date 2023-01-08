import { ctx } from "../util/globals";
import { Area, Axis, BaseUnit, Image } from "./base";
import { Player } from "./player";

export interface PlatformClass {
  position: Axis;
}

export class Platform implements PlatformClass, Area, Image {
  position: Axis;
  width!: number;
  height!: number;
  image?: HTMLImageElement | Area;

  constructor({ x, y, image }: Axis & Image) {
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

  collision(player: BaseUnit) {
    if (player.name === "slime") {
      // console.log(player.name, player.velocity.y);
      
    } else {
      // console.log(player.name, player.velocity.y)
    }
    if (
      player.position.y + player.height <= this.position.y &&
      player.position.y + player.height + player.velocity.y >=
        this.position.y &&
      player.position.x + player.width >= this.position.x &&
      player.position.x <= this.position.x + this.width
    ) {
      player.jumpped = false;
      player.velocity.y = 0;
    }
  }
}
