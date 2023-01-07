import { BottomItem, FootItem, HeadItem, TopItem } from "./items";

export type PlayerEquipmentType = "head" | "top" | "bottom" | "foot";

export class Equipment {
  equiped: boolean = false;
  constructor(equiped?: boolean) {
    equiped && (this.equiped = equiped);
  }
  take() {
    this.equiped = true;
  }
  takeoff() {
    this.equiped = false;
  }
}

export class PlayerEquipment {
  head: HeadItem;
  top: TopItem;
  bottom: BottomItem;
  foot: FootItem;

  constructor(
    head: HeadItem,
    top: TopItem,
    bottom: BottomItem,
    foot: FootItem
  ) {
    this.head = head;
    this.top = top;
    this.bottom = bottom;
    this.foot = foot;
  }

  take(type: PlayerEquipmentType) {
    this[type].equiped = true;
  }
  takeoff(type: PlayerEquipmentType) {
    this[type].equiped = false;
  }
}
