import { BaseUnit } from "../model/base/base.unit";
import { Generic } from "../model/object/generic";
import { Platform } from "../model/object/platform";

export class Drawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  plugins: (Platform | Generic)[] = [];
  constructor() {
    this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    requestAnimationFrame(this.render.bind(this));
  }

  render(time: number) {
    requestAnimationFrame(this.render.bind(this));
  }
}
