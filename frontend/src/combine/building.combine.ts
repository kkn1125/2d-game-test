import { Axis, Image } from "../models/base";
import { BuildingObject } from "../models/building";

export class BuildingCombine {
  imageSource?: HTMLImageElement;
  building: BuildingObject[] = [];
  constructor(imageSource?: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  add(building: (Axis & Image) | (Axis & Image)[]) {
    if (building instanceof Array) {
      for (let pf of building) {
        this.building.push(new BuildingObject(pf));
      }
    } else {
      this.building.push(new BuildingObject(building));
    }
  }
  setImage(imageSource: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  moveHorizontally(value: number) {
    this.building.forEach((building) => building.moveHorizontally(value));
    // this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.building.forEach((building) => building.moveVertical(value));
    // this.position.y = this.position.y + value;
  }
  draw() {
    console.log(this.building);
    this.building.forEach((building) => building.draw());
  }
  clear() {
    this.building = [];
  }
}
