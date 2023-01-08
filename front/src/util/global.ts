export const canvas = document.querySelector("canvas");
export const ctx = (canvas as HTMLCanvasElement).getContext(
  "2d"
) as CanvasRenderingContext2D;
