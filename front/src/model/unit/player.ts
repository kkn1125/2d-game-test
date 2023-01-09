import { STATIC_VAR } from "../../util/global";
import { BaseUnit } from "../base/base.unit";
import { Item } from "../object/item";

export class Inventory {
  items: Item[] = [];
  maxWeight: number = STATIC_VAR["INIT_WEIGHT"];
  maxAmount: number = STATIC_VAR["INIT_AMOUNT"];

  expand(value: number) {
    this.maxAmount += value;
  }
  increase(value: number) {
    this.maxWeight += value;
  }
  drop(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }
  clear() {
    this.items = [];
  }
}

export class Player extends BaseUnit {
  inventory: Inventory = new Inventory();
  constructor(name: string, hpmp: HpMp, position: Position, size: Size) {
    super(name, hpmp, position, size);
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
