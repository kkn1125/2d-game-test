import { RayPoint } from "../models/raypoint";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

export const pointer = new RayPoint();

export const keys = {
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

export const scrollOptions = {
  windowLeftLimit: 0,
  windowRightLimit: 0,
  scrollOffset: 0,
  mapEnd: 2000,
};
