import { canvas, ctx, pointer } from "../util/globals";
import { Area, Axis, BaseUnit, PlayerClass, UnitInfo } from "./base";
import { BuildingObject } from "./building";
import { PlayerEquipment } from "./equipments";
import { BottomItem, FootItem, HeadItem, Item, TopItem } from "./items";
import { Stats } from "./stats";

export class Player extends BaseUnit implements UnitInfo, PlayerClass, Area {
  equipment: PlayerEquipment = new PlayerEquipment(
    new HeadItem(
      {
        type: "normal",
        name: "none",
        price: 0,
        stats: new Stats({ str: 0, dex: 0, int: 0, lux: 0 }),
      },
      true
    ),
    new TopItem(
      {
        type: "normal",
        name: "none",
        price: 0,
        stats: new Stats({ str: 0, dex: 0, int: 0, lux: 0 }),
      },
      true
    ),
    new BottomItem(
      {
        type: "normal",
        name: "none",
        price: 0,
        stats: new Stats({ str: 0, dex: 0, int: 0, lux: 0 }),
      },
      true
    ),
    new FootItem(
      {
        type: "normal",
        name: "none",
        price: 0,
        stats: new Stats({ str: 0, dex: 0, int: 0, lux: 0, speed: 0 }),
      },
      true
    )
  );
  gravity: number = 1;
  position: Axis;
  velocity: Axis;
  width: number;
  height: number;
  // speed: number = 5;
  jumpped: boolean = false;
  building: BuildingObject | undefined;
  stats: Stats = new Stats({ str: 5, dex: 2, int: 1, lux: 2, speed: 15 });

  infoBarSize: {
    width: number;
    height: number;
  } = {
    width: 100,
    height: 20,
  };

  health: number = 100;
  mana: number = 20;

  maxHealth: number = 100;
  maxMana: number = 20;

  inventory: Inventory = new Inventory(5, 6, 50);

  constructor(name?: string, health?: number, mana?: number) {
    console.log(name);
    super(
      name || "Player",
      {
        x: 100,
        y: 100,
      },
      {
        x: 0,
        y: 0,
      },
      30,
      30
    );
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;

    this.updateUserStats();
    console.log(this.equipment.foot.item.stats.speed);

    this.infoBarSize.width = 50;
    this.infoBarSize.height = 5;
    health && (this.health = health);
    mana && (this.mana = mana);
    health && (this.maxHealth = health);
    mana && (this.maxMana = mana);
  }

  updateUserStats() {
    if (this.equipment.foot.equiped) {
      if (this.equipment.foot.item.stats.speed) {
        this.stats.speed += this.equipment.foot.item.stats.speed;
      }
    }
  }

  frontOfBuilding(building: BuildingObject) {
    this.building = building;
  }
}

export class Inventory {
  items: Item[] = [];
  x: number;
  y: number;
  limits: number;
  BLOCK: number = 50;
  PADDING: number = 5;
  isOpen: number = 0;
  inventoryPosition = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  };
  constructor(x: number, y: number, limits: number) {
    this.x = x;
    this.y = y;
    this.limits = limits;
    this.items = new Array(x * y).fill(null);
    pointer.addDetection("inventory", this);
  }

  add(item: Item) {
    this.items.push(item);
  }
  open() {
    function open(this: any) {
      if (!!ctx) {
        const leftBasePosition = canvas.width - this.x * this.BLOCK;
        this.inventoryPosition.x = this.x;
        this.inventoryPosition.y = this.y;
        this.inventoryPosition.padding = this.PADDING;
        this.inventoryPosition.block = this.BLOCK;
        this.inventoryPosition.left = leftBasePosition - 100 - this.PADDING / 2;
        this.inventoryPosition.right =
          this.inventoryPosition.left + this.BLOCK * this.x + this.PADDING / 2;
        this.inventoryPosition.top = 50 - this.PADDING / 2;
        this.inventoryPosition.bottom =
          this.inventoryPosition.top + this.y * this.BLOCK + this.PADDING / 2;
        this.inventoryPosition.width = this.x * this.BLOCK;
        this.inventoryPosition.height = this.y * this.BLOCK;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          leftBasePosition - 100,
          50,
          this.inventoryPosition.width,
          this.inventoryPosition.height
        );

        this.items.forEach((item: any, i: number) => {
          if (!!ctx) {
            ctx.fillStyle = item === null ? "#ccc" : "#222";
            ctx.fillRect(
              leftBasePosition -
                100 +
                (i % this.x) * this.BLOCK +
                this.PADDING / 2,
              50 +
                parseInt((i / this.x).toString()) * this.BLOCK +
                this.PADDING / 2,
              this.BLOCK - this.PADDING,
              this.BLOCK - this.PADDING
            );
          }
        });

        pointer.addDetection("inventoryPosition", this.inventoryPosition);
        pointer.update();
      }

      this.isOpen = requestAnimationFrame(open.bind(this));
    }

    if (!this.isOpen) {
      this.isOpen = requestAnimationFrame(open.bind(this));
      pointer.addDetection("isOpenInven", true);
    } else {
      pointer.addDetection("isOpenInven", false);
      document.body.style.cursor = "inherit";
      this.close();
    }

    return this.items;
  }

  close() {
    cancelAnimationFrame(this.isOpen);
    this.isOpen = 0;
  }
}
