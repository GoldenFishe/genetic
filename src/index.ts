import { Environment } from "./app/Environment";
import { Population } from "./app/Population";
import { Painter } from "./app/Painter";

const startButton = document.getElementById("startButton") as HTMLButtonElement;

startButton.addEventListener("click", main);

export function main() {
  const targetPoint = { x: 250, y: 50 };
  const bounds = { x: 0, y: 0, width: 500, height: 500 };

  const population = new Population(50, 10, 1500, targetPoint);
  const environment = new Environment(bounds, population);
  const painter = new Painter(environment, targetPoint);

  painter.draw();
}