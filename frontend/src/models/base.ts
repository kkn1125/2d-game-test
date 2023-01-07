export interface Area {
  width: number;
  height: number;
}

export interface Image {
  image: HTMLImageElement;
}

export interface Axis {
  x: number;
  y: number;
}

export interface PlayerClass {
  position: Axis;
  velocity: Axis;
}
