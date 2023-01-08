import { Axis, Image } from "../models/base";
import { GenericObject } from "../models/generic";

export class GenericObjectsCombine {
  imageSource?: HTMLImageElement;
  generic: GenericObject[] = [];
  constructor(imageSource?: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  add(generic: (Axis & Image) | (Axis & Image)[]) {
    if (generic instanceof Array) {
      for (let pf of generic) {
        this.generic.push(new GenericObject(pf));
      }
    } else {
      this.generic.push(new GenericObject(generic));
    }
  }
  setImage(imageSource: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  moveHorizontally(value: number) {
    this.generic.forEach((generic) => generic.moveHorizontally(value));
    // this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.generic.forEach((generic) => generic.moveVertical(value));
    // this.position.y = this.position.y + value;
  }
  draw() {
    // console.log(this.generic);
    this.generic.forEach((generic) => generic.draw());
  }
  clear() {
    this.generic = [];
  }
}
