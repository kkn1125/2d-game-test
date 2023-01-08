import { ctx } from "../util/globals";
import { Area, Axis, Image } from "./base";
import { PlatformClass } from "./platform";

export class BuildingObject implements PlatformClass, Area, Image {
  name: string;
  width: number;
  height: number;
  image: HTMLImageElement;
  position: Axis;
  color: string | CanvasGradient | CanvasPattern;

  constructor({
    name,
    width,
    height,
    image,
    position,
    color,
  }: {
    name: string;
    width: number;
    height: number;
    image: HTMLImageElement;
    position: Axis;
    color: string | CanvasGradient | CanvasPattern;
  }) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.image = image;
    this.position = position;
    this.color = color;
  }

  marker(time: number) {
    const text = "ENTER";
    if (!!ctx) {
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText(
        text,
        this.position.x + this.width / 2 - 100 / 2 + 50,
        this.position.y - this.height + 200 + Math.sin(time * 10) * 3
      );
      ctx.fillText(
        "⬇️",
        this.position.x + this.width / 2 - 100 / 2 + 50,
        this.position.y - this.height + 230 + Math.sin(time * 10) * 3
      );
    }
  }

  drawWindow() {
    if (!!ctx) {
      ctx.fillStyle = "#0056ff55";
      ctx.fillRect(
        this.position.x + 50,
        this.position.y - this.height + 100,
        100,
        100
      );
      ctx.fillStyle = "#0056ff55";
      ctx.fillRect(
        this.position.x + this.width - 150,
        this.position.y - this.height + 100,
        100,
        100
      );
    }
  }

  drawDoor() {
    if (!!ctx) {
      ctx.fillStyle = "#855523";
      ctx.fillRect(
        this.position.x + this.width / 2 - 100 / 2,
        this.position.y - this.height + 150,
        100,
        150
      );
    }
  }

  drawKanban() {
    const length = this.name.length * 30;
    const heightPadding = 20;
    const size = 40;
    if (!!ctx) {
      // ctx.fillStyle = "#ffffff56";
      // ctx.fillRect(
      //   this.position.x + this.width / 2 - length / 2,
      //   this.position.y - this.height - size - heightPadding,
      //   length,
      //   size + heightPadding
      // );
      // /* kanban outline */
      // ctx.strokeStyle = "#ffffff";
      // ctx.strokeRect(
      //   this.position.x + this.width / 2 - length / 2,
      //   this.position.y - this.height - size - heightPadding,
      //   length,
      //   size + heightPadding
      // );
      /* building name */
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name.toUpperCase(),
        this.position.x + this.width / 2,
        this.position.y - this.height - 20
      );
    }
  }

  draw() {
    if (!!ctx) {
      /* building */
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.position.x,
        this.position.y - this.height,
        this.width,
        this.height
      );
      /* window */
      // this.drawWindow();
      /* door */
      this.drawDoor();
      /* kanban */
      this.drawKanban();
    }
  }

  moveHorizontally(value: number) {
    this.position.x = this.position.x + value;
  }

  moveVertical(value: number) {
    this.position.y = this.position.y + value;
  }
}
