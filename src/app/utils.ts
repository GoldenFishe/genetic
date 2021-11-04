import { Car } from "./Car";

function generateDNA(length: number) {
  return new Array(length).fill(0).map(() => Math.random());
}

export function generateCars(amount: number) {
  return new Array(amount).fill(null).map(() => {
    const DNA = generateDNA(10);
    const position = { x: 0, y: 0 };
    return new Car(DNA, position);
  });
}

export function getRenderContext(canvasId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (canvas !== null) {
    const context = canvas.getContext("2d");
    if (context !== null) return context;
  }
  throw new Error("Can't get canvas element");
}