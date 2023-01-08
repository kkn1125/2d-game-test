export class Stat implements StatOption {
  str: number = 0;
  dex: number = 0;
  int: number = 0;
  luc: number = 0;
  constructor(stats?: StatOption) {
    if (stats) {
      const { str, dex, int, luc } = stats;
      str && (this.str = str);
      dex && (this.dex = dex);
      int && (this.int = int);
      luc && (this.luc = luc);
    }
  }
}
