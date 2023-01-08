import { BuildingCombine } from "./combine/building.combine";
import { GenericObjectsCombine } from "./combine/generic.combine";
import { MonsterCombine } from "./combine/monster.combine";
import { PlatFormCombine } from "./combine/platform.combine";
import { BuildingObject } from "./models/building";
import { GenericObject } from "./models/generic";
import { Monster } from "./models/monster";
import { Platform } from "./models/platform";
import { Player } from "./models/player";
import { canvas, ctx, keys, scrollOptions } from "./util/globals";
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
// let monster = new Monster("slime", { x: 300, y: 0 }, 20, 50, 0);
let platformImage = createImage(platform);
let backgroundImage = createImage(background);
let rockImage = createImage(rock);

scrollOptions.windowLeftLimit = canvas.width / 4;
scrollOptions.windowRightLimit = canvas.width - canvas.width / 4;

const platforms = new PlatFormCombine();
const generics = new GenericObjectsCombine();
const buildings = new BuildingCombine();
const monsters = new MonsterCombine();

scrollOptions.scrollOffset = 0;

function enterBuilding(buildingInfo: BuildingObject) {
  player = new Player("Player1");
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
  buildings.clear();

  scrollOptions.scrollOffset = 0;
}

function init() {
  player = new Player("Player1");
  monsters.add(new Monster("slime", { x: 300, y: 0 }, 20, 50, 0));
  // monster = new Monster("slime", { x: 300, y: 0 }, 20, 50, 0);
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
  ]);
  generics.add([
    { x: 0, y: 0, image: backgroundImage },
    {
      x: rockImage.width * 4,
      y: 576 - rockImage.height,
      image: { width: rockImage.width, height: rockImage.height },
    },
    {
      x: rockImage.width * 2,
      y: 576 - rockImage.height + 150,
      image: { width: rockImage.width, height: rockImage.height },
    },
    {
      x: rockImage.width * 0.5,
      y: 576 - rockImage.height,
      image: { width: rockImage.width, height: rockImage.height },
    },
  ]);

  buildings.add([
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
  ]);

  scrollOptions.scrollOffset = 0;
}

function animate(time: number) {
  time *= 0.001;
  requestAnimationFrame(animate);
  if (!!ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  generics.draw();
  buildings.draw();
  // console.log(platforms);
  platforms.draw();
  player.update();
  monsters.update();
  monsters.aiMove(time);
  // monsters.draw();

  // attack collision
  monsters.detect(player);

  if (!player.jumpped && !player.building && keys.up.pressed) {
    player.jump();
  }
  monsters.boundaryCollision();
  // console.log(scrollOptions.scrollOffset < scrollOptions.mapEnd);
  if (
    keys.right.pressed &&
    player.position.x < scrollOptions.windowRightLimit
  ) {
    player.velocity.x = player.stats.speed;
  } else if (
    (keys.left.pressed && player.position.x > scrollOptions.windowLeftLimit) ||
    (keys.left.pressed &&
      scrollOptions.scrollOffset === 0 &&
      player.position.x > 0 &&
      player.position.x)
  ) {
    player.velocity.x = -player.stats.speed;
  } else {
    player.velocity.x = 0;

    if (
      keys.right.pressed &&
      // 실제적으로 맵 바운더리를 나타내는 부분
      scrollOptions.scrollOffset < scrollOptions.mapEnd
    ) {
      scrollOptions.scrollOffset += player.stats.speed;
      platforms.moveHorizontally(-player.stats.speed);
      buildings.moveHorizontally(-player.stats.speed);
      generics.moveHorizontally(-player.stats.speed * 0.66);
      monsters.moveHorizontally(-player.stats.speed);
    } else if (keys.left.pressed && scrollOptions.scrollOffset > 0) {
      scrollOptions.scrollOffset -= player.stats.speed;
      platforms.moveHorizontally(player.stats.speed);
      buildings.moveHorizontally(player.stats.speed);
      generics.moveHorizontally(player.stats.speed * 0.66);
      monsters.moveHorizontally(player.stats.speed);
    }
  }

  platforms.collision([player, monsters]);
  buildings.frontOfDoor(time, player, enterBuilding);

  if (scrollOptions.scrollOffset > scrollOptions.mapEnd) {
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
  // console.log(key);
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
