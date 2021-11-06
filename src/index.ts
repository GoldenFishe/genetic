import { Environment } from "./app/Environment";
import { Population } from "./app/Population";
import { Painter } from "./app/Painter";
import { Graphic } from "./app/Graphic";

const startButton = document.getElementById("startButton") as HTMLButtonElement;

startButton.addEventListener("click", main);

export const graphic = new Graphic();

export function main() {
  const targetPoint = { x: 250, y: 50 };
  const bounds = { x: 0, y: 0, width: 500, height: 500 };

  const population = new Population(20, 10, 500, targetPoint);
  const environment = new Environment(bounds, population);
  const painter = new Painter(environment, targetPoint);

  painter.draw();
}