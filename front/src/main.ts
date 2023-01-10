import { GenericCombine } from "./combine/generic.combine";
import { PlatformCombine } from "./combine/platform.combine";
import { UnitCombine } from "./combine/unit.combine";
import { Drawer } from "./drawer";
import { Generic } from "./model/object/generic";
import { Item } from "./model/object/item";
import { Monster } from "./model/unit/monster";
import { Player } from "./model/unit/player";

const drawer = new Drawer();
// drawer.add();
drawer.register(
  new UnitCombine([
    new Monster(
      "slime",
      { hp: 50, maxHp: 50, mp: 0, maxMp: 0 },
      { x: 500, y: 0 },
      { width: 20, height: 20 }
    ),
  ])
);
drawer.register(new PlatformCombine());
drawer.register(
  new GenericCombine([
    new Generic(
      "background",
      { x: 0, y: 0 },
      {
        width: innerWidth,
        height: innerHeight,
      }
    ),
  ])
);
drawer.register(
  new Player(
    "player",
    { hp: 100, maxHp: 100, mp: 50, maxMp: 50 },
    { x: 0, y: 0 },
    { width: 30, height: 30 }
  )
);

drawer.render();

export {};
