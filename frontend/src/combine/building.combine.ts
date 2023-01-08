import { BuildingObject } from "../models/building";
import { Player } from "../models/player";
import { keys } from "../util/globals";

export class BuildingCombine {
  imageSource?: HTMLImageElement;
  buildings: BuildingObject[] = [];
  constructor(imageSource?: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  add(building: BuildingObject | BuildingObject[]) {
    if (building instanceof Array) {
      for (let pf of building) {
        this.buildings.push(new BuildingObject(pf));
      }
    } else {
      this.buildings.push(new BuildingObject(building));
    }
  }
  setImage(imageSource: HTMLImageElement) {
    this.imageSource = imageSource;
  }
  moveHorizontally(value: number) {
    this.buildings.forEach((building) => building.moveHorizontally(value));
    // this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.buildings.forEach((building) => building.moveVertical(value));
    // this.position.y = this.position.y + value;
  }
  draw() {
    // console.log(this.buildings);
    this.buildings.forEach((building) => building.draw());
  }
  clear() {
    this.buildings = [];
  }
  frontOfDoor(time: number, player: Player, enterBuilding: Function) {
    this.buildings.forEach((building) => {
      if (
        player.position.x + player.width >=
          building.position.x + building.width / 2 - 50 &&
        player.position.x < building.position.x + building.width / 2 + 50
      ) {
        building.marker(time);
        if (keys.up.pressed) {
          player.frontOfBuilding(building);
          if (confirm(`"${building.name}"에 입장하시겠습니까?`)) {
            enterBuilding(building);
            player.building = undefined;
            player.velocity.x = 0;
            player.velocity.y = 0;
            player.jumpped = false;
            keys.up.pressed = false;
            keys.left.pressed = false;
            keys.right.pressed = false;
          } else {
            player.building = undefined;
            player.velocity.x = 0;
            player.velocity.y = 0;
            player.jumpped = false;
            keys.up.pressed = false;
            keys.left.pressed = false;
            keys.right.pressed = false;
          }
          player.building = undefined;
        }
      }
    });
  }
}
