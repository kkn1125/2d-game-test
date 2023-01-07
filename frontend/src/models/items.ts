import { Equipment } from "./equipments";
import { Stats } from "./stats";

export interface ItemType {
  type: string;
  name: string;
  price: number;
}

export interface OptionalItemType extends ItemType {
  stats: Stats;
}

export class Item implements OptionalItemType {
  type: string;
  name: string = "noname";
  price: number;
  stats: Stats;
  constructor({ type, name, price, stats }: OptionalItemType) {
    this.type = type;
    this.name = name;
    this.price = price;
    this.stats = stats;
  }
  setPrice(price: number) {
    this.price = price;
  }
  setStats(stats: Stats) {
    this.stats = new Stats(stats);
  }
}

export class HeadItem extends Equipment {
  item: Item;
  place: string;
  constructor(
    { type, name, price, stats }: OptionalItemType,
    equiped: boolean = false
  ) {
    super(equiped);
    this.item = new Item({ type, name, price, stats });
    this.place = "head";
  }
}
export class TopItem extends Equipment {
  item: Item;
  place: string;
  constructor(
    { type, name, price, stats }: OptionalItemType,
    equiped: boolean = false
  ) {
    super(equiped);
    this.item = new Item({ type, name, price, stats });
    this.place = "top";
  }
}
export class BottomItem extends Equipment {
  item: Item;
  place: string;
  constructor(
    { type, name, price, stats }: OptionalItemType,
    equiped: boolean = false
  ) {
    super(equiped);
    this.item = new Item({ type, name, price, stats });
    this.place = "bottom";
  }
}
export class FootItem extends Equipment {
  item: Item;
  place: string;
  constructor(
    { type, name, price, stats }: OptionalItemType,
    equiped: boolean = false
  ) {
    super(equiped);
    this.item = new Item({ type, name, price, stats });
    this.place = "foot";
  }
}
