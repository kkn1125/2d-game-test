import { Generic } from "../model/object/generic";

export class GenericCombine implements BaseMethod {
  generics: Generic[] = [];

  constructor(generic?: Generic | Generic[]) {
    if (generic) {
      if (generic instanceof Array) {
        this.generics = this.generics.concat(generic);
      } else {
        this.generics.push(generic);
      }
    }
  }

  add(generic: Generic | Generic[]) {
    if (generic instanceof Array) {
      this.generics = this.generics.concat(generic);
    } else {
      this.generics.push(generic);
    }
  }

  clear() {
    this.generics = [];
  }

  draw() {
    this.generics.forEach((generic) => generic.draw());
  }
  offset() {}
}
