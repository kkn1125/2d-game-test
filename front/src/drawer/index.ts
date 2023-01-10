import { GenericCombine } from "../combine/generic.combine";
import { PlatformCombine } from "../combine/platform.combine";
import { UnitCombine } from "../combine/unit.combine";
import { Generic } from "../model/object/generic";
import { Platform } from "../model/object/platform";
import { Player } from "../model/unit/player";
import { canvas, ctx } from "../util/global";

export class Drawer {
  platforms: PlatformCombine = new PlatformCombine();
  units: UnitCombine = new UnitCombine();
  generics: GenericCombine = new GenericCombine();
  player: Player = new Player(
    "none",
    {
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
    },
    {
      x: 0,
      y: 0,
    },
    {
      width: 30,
      height: 30,
    }
  );
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = canvas as HTMLCanvasElement;
    this.ctx = ctx as CanvasRenderingContext2D;

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    window.addEventListener("resize", () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    });
  }

  register(plugin: PlatformCombine | UnitCombine | GenericCombine | Player) {
    if (plugin instanceof PlatformCombine) {
      this.platforms = plugin;
    } else if (plugin instanceof UnitCombine) {
      this.units = plugin;
    } else if (plugin instanceof GenericCombine) {
      this.generics = plugin;
    } else if (plugin instanceof Player) {
      this.player = plugin;
    }
  }

  draw(time: number) {
    this.generics.draw();
    this.platforms.draw();
    this.units.draw(time);
    this.player.draw(time);
  }

  render(time?: number) {
    this.draw(time as number);
    requestAnimationFrame(this.render.bind(this));
  }
}
