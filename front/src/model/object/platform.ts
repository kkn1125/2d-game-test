import { BaseObject } from "../base/base.object";

export class Platform
  extends BaseObject
  implements ObjectProperty, ObjectMethod
{
  name: string = "noname";
  position: Position = { x: 0, y: 0 };
  source?: HTMLImageElement | Size;
  constructor(
    name: string,
    position: Position,
    source: HTMLImageElement | Size
  ) {
    super(name, position);
    source && (this.source = source);
  }
  draw() {}
  offset() {}
  collision() {}
}
