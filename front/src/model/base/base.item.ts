import { STATIC_VAR } from "../../util/global";
import { Base } from "./base";
import { Stat } from "./base.stat";

const itemList = new Map<number, BaseItem>();

export class BaseItem extends Base {
  id: number = 0;
  name: string = STATIC_VAR.INIT_NAME;
  grade: number = STATIC_VAR.INIT_GRADE;
  stat: Stat = new Stat();
  price: number = 0;
  weight: number = 0;
  amount: number = 0;
  constructor(
    name?: string,
    grade?: number,
    price?: number,
    stat?: Stat,
    weight?: number,
    amount?: number
  ) {
    super();
    this.id = itemList.size;
    name && (this.name = name);
    grade && (this.grade = grade);
    price && (this.price = price);
    stat && (this.stat = stat);
    weight && (this.weight = weight);
    amount && (this.amount = amount);
    itemList.set(this.id, this);
  }
}
