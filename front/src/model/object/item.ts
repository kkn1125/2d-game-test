import { applyPropertiesToMethod } from "../../util/global";
import { BaseItem } from "../base/base.item";
import { Stat } from "../base/base.stat";

export class Item extends BaseItem {
  setName!: (value: string) => void;
  setGrade!: (value: number) => void;
  setPrice!: (value: number) => void;
  setStat!: (value: number) => void;
  setWeight!: (value: number) => void;
  setAmount!: (value: number) => void;
  getName!: () => string;
  getGrade!: () => number;
  getPrice!: () => number;
  getStat!: () => number;
  getWeight!: () => number;
  getAmount!: () => number;

  constructor(
    name?: string,
    grade?: number,
    price?: number,
    stat?: Stat,
    weight?: number,
    amount?: number
  ) {
    super(name, grade, price, stat, weight, amount);
    applyPropertiesToMethod(this);
  }
}
