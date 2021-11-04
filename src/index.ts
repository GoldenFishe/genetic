import { generateCars, getRenderContext } from "./app/utils";
import { Drawler } from "./app/Drawler";

export function main() {
  const context = getRenderContext("canvas");
  const cars = generateCars(10);
  const drawler = new Drawler(context, cars);
  drawler.drawObjects();
  console.log(cars);
}

main();