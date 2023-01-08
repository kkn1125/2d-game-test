import { BaseUnit } from "../model/base/base.unit";

export class UnitCombine {
  units: BaseUnit[] = [];

  add(unit: BaseUnit | BaseUnit[]) {
    if (unit instanceof Array) {
      this.units = this.units.concat(unit);
    } else {
      this.units.push(unit);
    }
  }

  clear() {
    this.units = [];
  }

  offset(): void {
    this.units.forEach((unit) => unit.offset());
  }

  draw(): void {
    this.units.forEach((unit) => unit.draw());
  }
}
