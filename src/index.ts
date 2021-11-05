import { Painter } from "./app/Painter";
import { Population } from "./app/Population";

const startButton = document.getElementById("startButton") as HTMLButtonElement;
const evolveButton = document.getElementById("evolveButton") as HTMLButtonElement;

startButton.addEventListener("click", main);

export function main() {
  const targetPoint = { x: 250, y: 50 };
  const population = new Population(10, 10, targetPoint);
  const painter = new Painter(population, targetPoint);
  painter.draw();
  evolveButton.addEventListener('click', () => population.evolve())
}