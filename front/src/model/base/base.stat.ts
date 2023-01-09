import { Base } from "./base";

export class Stat extends Base implements StatOption {
  str: number = 0;
  dex: number = 0;
  int: number = 0;
  luc: number = 0;
  constructor(stats?: StatOption) {
    super();
    if (stats) {
      const { str, dex, int, luc } = stats;
      str && (this.str = str);
      dex && (this.dex = dex);
      int && (this.int = int);
      luc && (this.luc = luc);
    }
  }
}
