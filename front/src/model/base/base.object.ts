import { Base } from "./base";

export class BaseObject extends Base implements BaseOption {
  name: string = "noname";
  position: Position = { x: 0, y: 0 };
  constructor(name: string, position: Position) {
    super();
    name && (this.name = name);
    position && (this.position = position);
  }
}
