import { RayPoint } from "../models/raypoint";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

export const pointer = new RayPoint();
