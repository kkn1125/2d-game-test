import platform from "/images/platform.png?url";
import background from "/images/background.png?url";
import rock from "/images/rock.png?url";
import storeBackground from "/images/storeBackground.jpg?url";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
let isJump = false;

canvas.width = 1024;
canvas.height = 576;

const gravity = 1;

interface Area {
  width: number;
  height: number;
}

interface Image {
  image: HTMLImageElement;
}

interface Axis {
  x: number;
  y: number;
}

interface PlayerClass {
  position: Axis;
  velocity: Axis;
}

class Item {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

type RayPointEventType = "hover" | "click";

class RayPoint {
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

const pointer = new RayPoint();

class Inventory {
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

class Player implements PlayerClass, Area {
  position: Axis;
  velocity: Axis;
  width: number;
  height: number;
  speed: number = 10;

  inventory: Inventory = new Inventory(5, 6, 50);

  constructor() {
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
  }

  draw() {
    if (!!ctx) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    /* gravity setting */
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
    //  else {
    //   this.velocity.y = 0;
    // }
  }
}

interface PlatformClass {
  position: Axis;
}

class Platform implements PlatformClass, Area, Image {
  position: Axis;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor({ x, y, image }: Axis & Image) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    if (!!ctx) {
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }
}

class GenericObject implements PlatformClass, Area, Image {
  position: Axis;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor({ x, y, image }: Axis & Image) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    if (!!ctx) {
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }
}

class BuildingObject implements PlatformClass, Area, Image {
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

  marker() {
    const text = "ENTER";
    if (!!ctx) {
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText(
        text,
        this.position.x + this.width / 2 - 100 / 2 + 50,
        this.position.y - this.height + 250
      );
    }
  }

  draw() {
    const length = this.name.length * 30;
    const heightPadding = 20;
    const size = 40;
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
      /* door */
      ctx.fillStyle = "#855523";
      ctx.fillRect(
        this.position.x + this.width / 2 - 100 / 2,
        this.position.y - this.height + 150,
        100,
        150
      );
      /* kanban */
      ctx.fillStyle = "#ffffff56";
      ctx.fillRect(
        this.position.x + this.width / 2 - length / 2,
        this.position.y - this.height - size - heightPadding,
        length,
        size + heightPadding
      );
      /* kanban outline */
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(
        this.position.x + this.width / 2 - length / 2,
        this.position.y - this.height - size - heightPadding,
        length,
        size + heightPadding
      );
      /* building name */
      ctx.fillStyle = "#000000";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name.toUpperCase(),
        this.position.x + this.width / 2,
        this.position.y - this.height - 20
      );
    }
  }
}

function createImage(imageSrc: string, width?: number, height?: number) {
  const image = new Image();
  image.src = imageSrc;
  // console.log(image);
  if (width && height) {
    image.width = width;
    image.height = height;
  }
  return image;
}

let player = new Player();
let platformImage = createImage(platform);
let backgroundImage = createImage(background);
let rockImage = createImage(rock);

let platforms: Platform[] = [];
let genericObjects: GenericObject[] = [];
let buildingObjects: BuildingObject[] = [];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
};

let scrollOffset = 0;

function enterBuilding(buildingInfo: BuildingObject) {
  player = new Player();
  platformImage = createImage(platform);
  backgroundImage = createImage(storeBackground);
  // rockImage = createImage(rock);
  console.log(buildingInfo.name, "entered");
  genericObjects = [
    new GenericObject({
      x: 0,
      y: 0,
      image: backgroundImage,
    }),
  ];
  platforms = [
    new Platform({
      x: platformImage.width * 0,
      y: 470,
      image: platformImage,
    }),
  ];
  buildingObjects = [];

  scrollOffset = 0;
}

function init() {
  player = new Player();
  platformImage = createImage(platform);
  backgroundImage = createImage(background);
  rockImage = createImage(rock);

  platforms = [
    new Platform({
      x: platformImage.width * 4,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 1,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 0,
      y: 470,
      image: platformImage,
    }),
  ];

  genericObjects = [
    /* background */
    new GenericObject({
      x: 0,
      y: 0,
      image: backgroundImage,
    }),
    /* rocks */
    new GenericObject({
      x: rockImage.width * 4,
      y: 576 - rockImage.height,
      image: rockImage,
    }),
    new GenericObject({
      x: rockImage.width * 2,
      y: 576 - rockImage.height + 150,
      image: rockImage,
    }),
    new GenericObject({
      x: rockImage.width * 0,
      y: 576 - rockImage.height,
      image: rockImage,
    }),
  ];

  buildingObjects = [
    new BuildingObject({
      name: "account",
      width: 500,
      height: 300,
      image: new Image(),
      position: {
        x: 1200,
        y: 470,
      },
      color: "green",
    }),
    new BuildingObject({
      name: "house",
      width: 500,
      height: 300,
      image: new Image(),
      position: {
        x: 500,
        y: 470,
      },
      color: "yellow",
    }),
  ];

  scrollOffset = 0;
}

function animate(time: number) {
  time *= 0.001;
  requestAnimationFrame(animate);
  if (!!ctx) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  genericObjects.forEach((genericObject) => genericObject.draw());
  buildingObjects.forEach((building) => building.draw());
  platforms.forEach((platform) => platform.draw());
  player.update();

  // platform.draw();
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      buildingObjects.forEach((building) => {
        building.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      buildingObjects.forEach((building) => {
        building.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      isJump = false;
      player.velocity.y = 0;
    }
  });

  buildingObjects.forEach((building) => {
    if (
      player.position.x + player.width >=
        building.position.x + building.width / 2 - 50 &&
      player.position.x < building.position.x + building.width / 2 + 50
    ) {
      building.marker();
      if (keys.up.pressed) {
        enterBuilding(building);
      }
    }
  });

  if (scrollOffset > 2000) {
    console.log("you win");
  }

  if (player.position.y > canvas.height) {
    console.log("you lose");
    player.inventory.close();
    init();
  }
}

init();

requestAnimationFrame(animate);

addEventListener("keydown", (e) => {
  const { key } = e;
  console.log(key);
  switch (key.toLowerCase()) {
    case "a":
      keys.left.pressed = true;
      break;
    case "d":
      keys.right.pressed = true;
      break;
    case "s":
      break;
    case "w":
      keys.up.pressed = true;
      if (!isJump) {
        player.velocity.y -= 20;
        isJump = true;
      }
      break;
    case "e":
      // keys.up.pressed = true;
      player.inventory.open();
      break;
  }
});

addEventListener("keyup", (e) => {
  const { key } = e;
  switch (key.toLowerCase()) {
    case "a":
      keys.left.pressed = false;
      break;
    case "d":
      keys.right.pressed = false;
      break;
    case "s":
      break;
    case "w":
      keys.up.pressed = false;
      // player.velocity.y -= 10;
      // player.inventory.close();
      break;
  }
});

export {};
