export class BaseObject implements BaseOption {
  name: string = "noname";
  position: Position = { x: 0, y: 0 };
  constructor(name: string, position: Position) {
    name && (this.name = name);
    position && (this.position = position);
  }
}
