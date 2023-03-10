export interface StatsType {
  str: number;
  dex: number;
  int: number;
  lux: number;
  speed?: number;
}
export class Stats implements StatsType {
  str: number = 1;
  dex: number = 1;
  int: number = 1;
  lux: number = 1;
  speed: number = 0;
  constructor(stats?: StatsType) {
    const { str, dex, int, lux, speed } = stats || {
      str: 1,
      dex: 1,
      int: 1,
      lux: 1,
    };
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.lux = lux;
    speed && (this.speed = speed);
  }
  setStr(str: number) {
    this.str = str;
  }
  setDex(dex: number) {
    this.dex = dex;
  }
  setInt(int: number) {
    this.int = int;
  }
  setLux(lux: number) {
    this.lux = lux;
  }
  setSpeed(speed: number) {
    this.speed = speed;
  }
}
