import { canvas, ctx } from "../util/globals";

export type RayPointEventType = "hover" | "click";

export class RayPoint {
  detections: Map<string, any> = new Map();
  drawShadow = false;
  event: any;

  constructor() {
    window.addEventListener("mousemove", this.detectHandler.bind(this));
  }

  detectHandler(e: MouseEvent) {
    if (this.detections.get("isOpenInven")) {
      this.drawShadow = true;
      this.event = e;
    } else {
      this.drawShadow = false;
      this.event = null;
    }
    // console.log(this.detections);
  }

  addDetection(type: string, value: any) {
    this.detections.set(type, value);
  }

  update() {
    if (!this.event) return;

    const position = this.detections.get("inventoryPosition");
    const canvasSize = canvas.getBoundingClientRect();
    const originX = this.event.clientX - canvasSize.left;
    const originY = this.event.clientY - canvasSize.top;
    // console.log(originY, canvasSize.top, position.top);
    if (
      position.left < originX &&
      originX < position.right &&
      originY > position.top &&
      originY < position.bottom
    ) {
      const x = parseInt(
        ((originX - position.left) / position.block).toString()
      );
      const y = parseInt(
        ((originY - position.top) / position.block).toString()
      );
      // console.log(x, y);
      // function drawBox() {
      if (!!ctx) {
        ctx.fillStyle = "#00000055";
        document.body.style.cursor = "pointer";
        ctx.fillRect(
          x * position.block + position.padding / 2 + position.left,
          y * position.block + position.padding / 2 + position.top,
          position.block,
          position.block
        );
      }

      // requestAnimationFrame(drawBox);
      // }
      // requestAnimationFrame(drawBox);
      // console.log(originY);
    } else {
      document.body.style.cursor = "inherit";
    }
  }
}
