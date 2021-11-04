import { IPopulation } from "./Population";

type Size = { width: number; height: number };
type TargetPoint = { x: number; y: number };

export class Painter {
  private readonly context: CanvasRenderingContext2D;
  private readonly population: IPopulation;
  private readonly size: Size;
  private readonly populationLabel: HTMLElement;
  private readonly generationLabel: HTMLElement;
  private readonly targetPoint: TargetPoint;

  constructor(population: IPopulation, targetPoint: TargetPoint) {
    this.context = this.getRenderContext("canvas");
    this.population = population;
    this.size = { width: this.context.canvas.width, height: this.context.canvas.height };
    this.populationLabel = document.getElementById("population") as HTMLElement;
    this.generationLabel = document.getElementById("generation") as HTMLElement;
    this.targetPoint = targetPoint;
  }

  draw() {
    window.requestAnimationFrame(() => {
      const { width, height } = this.size;
      this.context.clearRect(0, 0, width, height);

      this.drawTarget();
      this.drawObjects();
      this.drawLabels();

      this.population.tick();

      this.draw();
    });
  }

  private getRenderContext(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) return context;
    }
    throw new Error("Can't get canvas element");
  }

  private drawObjects() {
    for (let object of this.population.members) {
      const { x, y } = object.position;
      const { width, height } = object.size;
      this.context.fillStyle = object.color;
      this.context.fillRect(x, y, width, height);
    }
  }

  private drawLabels() {
    this.populationLabel.innerText = this.population.members.length.toString();
    this.generationLabel.innerText = this.population.generation.toString();
  }

  private drawTarget() {
    const { x, y } = this.targetPoint;
    this.context.fillStyle = "yellow";
    this.context.fillRect(x, y, 20, 20);
  }
}