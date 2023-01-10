import { ctx } from "../../util/global";
import { BaseObject } from "../base/base.object";

export class Generic
  extends BaseObject
  implements ObjectProperty, ObjectMethod
{
  name: string = "noname";
  position: Position = { x: 0, y: 0 };
  source!: HTMLImageElement | Size;
  constructor(
    name: string,
    position: Position,
    source: HTMLImageElement | Size
  ) {
    super(name, position);
    source && (this.source = source);
  }
  draw() {
    if (!(this.source instanceof HTMLImageElement)) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, innerWidth, innerHeight - 100);
    }
  }
  offset() {}
}
