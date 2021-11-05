import { getRandomInRange } from "./utils";
import { DNA, IDNA } from "./DNA";

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Color = string;
type Params = {
  position: Position;
  color: Color;
  size: Size;
}

export interface IMember {
  fitnessValue: number;
  isDead: boolean;
  readonly params: Params;
  readonly DNA: IDNA;

  fitness(targetPoint: Position): number;

  crossover(partner: IMember): IMember;

  mutate(mutationRate: number): void;

  liveDay(day: number): void;
}

export class Member implements IMember {
  fitnessValue: number;
  isDead: boolean;
  readonly params: Params;
  readonly DNA: IDNA;
  private readonly lifetime: number;

  constructor(lifetime: number, position: Position, color?: Color) {
    this.params = {
      position: position,
      color: color || this.generateColor(),
      size: { width: 10, height: 10 }
    };
    this.fitnessValue = 0;
    this.isDead = false;
    this.lifetime = lifetime;
    this.DNA = new DNA(lifetime);
  }

  fitness(targetPoint: Position) {
    const loss = this.loss(targetPoint);
    this.fitnessValue += 1 / (loss + 1);
    return this.fitnessValue;
  }

  crossover(partner: IMember) {
    const DNA = [];
    const position = { x: 250, y: 400 };
    for (let i = 0; i < this.DNA.genes.length; i++) {
      const DNAItem = Math.random() > 0.5 ? this.DNA.genes[i] : partner.DNA.genes[i];
      DNA.push(DNAItem);
    }
    return new Member(this.lifetime, position);
  }

  mutate(mutationRate: number) {
    for (let i = 0; i < this.DNA.genes.length; i++) {
      if (mutationRate > getRandomInRange(0, 100)) {
        this.DNA.genes[i] = DNA.generateGen();
      }
    }
  }

  liveDay(day: number) {
    const gene = this.DNA.genes[day];
    if (gene) {
      this.params.position.x += gene.x * 5;
      this.params.position.y += gene.y * 5;
    }
  }

  private generateColor() {
    const r = getRandomInRange(0, 255);
    const g = getRandomInRange(0, 255);
    const b = getRandomInRange(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private loss(targetPoint: Position) {
    const deltaX = this.params.position.x - targetPoint.x;
    const deltaY = this.params.position.y - targetPoint.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }
}