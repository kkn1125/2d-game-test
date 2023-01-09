import { Base } from "../model/base/base";

export const canvas = document.querySelector("canvas");
export const ctx = (canvas as HTMLCanvasElement).getContext(
  "2d"
) as CanvasRenderingContext2D;

export const STATIC_VAR = {
  INIT_NAME: "noname",
  INIT_GRADE: 0,
  INIT_STR: 0,
  INIT_DEX: 0,
  INIT_INT: 0,
  INIT_LUX: 0,
  INIT_HEALTH: 0,
  INIT_MANA: 0,
  INIT_PRICE: 0,
  INIT_AMOUNT: 0,
  INIT_WEIGHT: 0,
};

export const applyPropertiesToMethod = (classes: Base) => {
  const properties = Object.assign({}, classes);
  const temp: [string, Function][] = [];
  Object.keys(properties).forEach((prop) => {
    Object.defineProperty(
      classes,
      `set${prop.charAt(0).toUpperCase() + prop.slice(1)}`,
      {
        value: new Function(`value`, `this["${prop}"]=value;`),
      }
    );
    Object.defineProperty(
      classes,
      `get${prop.charAt(0).toUpperCase() + prop.slice(1)}`,
      {
        value: new Function(``, `return this["${prop}"];`),
      }
    );
  });
  Object.assign(classes, Object.fromEntries(temp));
  return temp;
};
