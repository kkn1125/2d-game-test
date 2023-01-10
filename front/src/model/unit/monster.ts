import { ctx } from "../../util/global";
import { BaseUnit } from "../base/base.unit";

let direction = Boolean(parseInt((Math.random() * 2).toString()));
export class Monster extends BaseUnit {
  
  constructor(name: string, hpmp: HpMp, position: Position, size: Size) {
    super(name, hpmp, position, size);
  }

  autoMove(time: number) {
    const random = Math.random() * 3700;
    if (parseInt((parseInt(random.toString()) / 38).toString()) === 0) {
      // console.log(parseInt((parseInt(random.toString()) / 38).toString()));
      direction = !direction;
      this.move(direction ? this.speed : -this.speed);
    }
    if (
      this.origin.x - 200 < this.position.x &&
      this.position.x < this.origin.x + 200
    ) {
      this.move(direction ? this.speed : -this.speed);
    }
  }

  update(time: number) {
    this.autoMove(time);
    this.slideMove();
    this.updateGravity();
  }

  // override
  draw(time: number) {
    this.update(time);
    this.color = "#ff0000";
    ctx.fillStyle = this.color + this.opacity.toString(16);
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(
      this.name,
      this.position.x + this.size.width / 2,
      this.position.y - 10
    );
  }

  // clearInventory() {

  // }

  // expandInventory(value: number) {
  //   this.inventory.expand(value);
  // }

  // increaseInventory(value: number) {
  //   this.inventory.increase(value);
  // }
}
