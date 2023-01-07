import { GenericObjectsCombine } from "./combine/generic.combine";
import { PlatFormCombine } from "./combine/platform.combine";
import { BuildingObject } from "./models/building";
import { GenericObject } from "./models/generic";
import { Platform } from "./models/platform";
import { Player } from "./models/player";
import { canvas, ctx } from "./util/globals";
import background from "/images/background.png?url";
import platform from "/images/platform.png?url";
import rock from "/images/rock.png?url";
import storeBackground from "/images/storeBackground.jpg?url";

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

const platforms = new PlatFormCombine();
const generics = new GenericObjectsCombine();
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
  generics.add([
    {
      x: 0,
      y: 0,
      image: backgroundImage,
    },
  ]);
  buildingObjects = [];

  scrollOffset = 0;
}

function init() {
  player = new Player();
  platformImage = createImage(platform);
  backgroundImage = createImage(background);
  rockImage = createImage(rock);
  platforms.clear();
  platforms.setImage(platformImage);
  platforms.add([
    {
      x: platformImage.width * 4,
      y: 470,
    },
    {
      x: platformImage.width * 3,
      y: 470,
    },
    {
      x: platformImage.width * 2,
      y: 470,
    },
    {
      x: platformImage.width * 1,
      y: 470,
    },
    {
      x: platformImage.width * 0,
      y: 470,
    },
  ]);
  generics.add([
    {
      x: 0,
      y: 0,
      image: backgroundImage,
    },
    {
      x: rockImage.width * 4,
      y: 576 - rockImage.height,
      image: rockImage,
    },
    {
      x: rockImage.width * 2,
      y: 576 - rockImage.height + 150,
      image: rockImage,
    },
    {
      x: rockImage.width * 0,
      y: 576 - rockImage.height,
      image: rockImage,
    },
  ]);
  generics.add([
    { x: 0, y: 0, image: backgroundImage },
    { x: rockImage.width * 4, y: 576 - rockImage.height, image: rockImage },
    {
      x: rockImage.width * 2,
      y: 576 - rockImage.height + 150,
      image: rockImage,
    },
    { x: rockImage.width * 0, y: 576 - rockImage.height, image: rockImage },
  ]);

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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  generics.draw();
  buildingObjects.forEach((building) => building.draw());
  console.log(platforms);
  platforms.draw();
  player.update();

  if (!player.jumpped && !player.building && keys.up.pressed) {
    player.jump();
  }

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
      platforms.moveHorizontally(-player.speed);
      buildingObjects.forEach((building) => {
        building.position.x -= player.speed;
      });
      generics.moveHorizontally(-player.speed * 0.66);
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.moveHorizontally(player.speed);

      buildingObjects.forEach((building) => {
        building.position.x += player.speed;
      });
      generics.moveHorizontally(player.speed * 0.66);
    }
  }

  platforms.collision(player);

  buildingObjects.forEach((building) => {
    if (
      player.position.x + player.width >=
        building.position.x + building.width / 2 - 50 &&
      player.position.x < building.position.x + building.width / 2 + 50
    ) {
      building.marker(time);
      if (keys.up.pressed) {
        player.frontOfBuilding(building);
        if (confirm(`"${building.name}"에 입장하시겠습니까?`)) {
          enterBuilding(building);
          player.building = undefined;
          player.velocity.y = 0;
          player.velocity.x = 0;
          player.jumpped = false;
          keys.up.pressed = false;
          keys.left.pressed = false;
          keys.right.pressed = false;
        } else {
          player.velocity.y = 0;
          player.velocity.x = 0;
          player.jumpped = false;
          keys.up.pressed = false;
          keys.left.pressed = false;
          keys.right.pressed = false;
        }
        player.building = undefined;
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
