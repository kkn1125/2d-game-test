import { Monster } from "../models/monster";
import { Player } from "../models/player";

export class MonsterCombine {
  monsters: Monster[] = [];
  add(monster: Monster | Monster[]) {
    if (monster instanceof Array) {
      this.monsters = this.monsters.concat(monster);
    } else {
      this.monsters.push(monster);
    }
  }
  draw() {
    // console.log(this.monsters);
    this.monsters.filter((monster) => monster.gradient > 0);
    this.monsters.forEach((monster) => monster.draw());
  }
  detect(player: Player) {
    this.monsters.forEach((monster) => {
      if (
        player.position.x + player.width > monster.position.x &&
        monster.position.x + monster.width > player.position.x
      ) {
        player.attack(monster);
        monster.attack(player);
      }
    });
  }
  update() {
    this.monsters.forEach((monster) => monster.update());
  }
  moveHorizontally(value: number) {
    this.monsters.forEach((monster) => monster.moveHorizontally(value));
    // this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.monsters.forEach((monster) => monster.moveVertical(value));
    // this.position.y = this.position.y + value;
  }

  aiMove(time: number) {
    this.monsters.forEach((monster) => monster.aiMove(time));
  }

  boundaryCollision() {
    this.monsters.forEach((monster) => monster.boundaryCollision());
  }
}
