import { getRandomInRange } from "./utils";

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Color = string;

export interface IMember {
  DNA: number[];
  position: Position;
  color: Color;
  size: Size;
  fitnessValue: number;

  fitness(targetPoint: Position): number;

  crossover(partner: IMember): IMember;

  mutate(mutationRate: number): void;

  move(): void;
}

export class Member implements IMember {
  readonly DNA: number[];
  readonly position: Position;
  readonly color: Color;
  readonly size: Size;
  fitnessValue: number;

  constructor(DNA: number[], position: Position, color?: Color) {
    this.DNA = DNA;
    this.position = position;
    this.color = color || this.generateColor();
    this.size = { width: 10, height: 10 };
    this.fitnessValue = 0;
  }

  fitness(targetPoint: Position) {
    const loss = this.loss(targetPoint);
    this.fitnessValue = 1 / (loss + 1);
    return this.fitnessValue;
  }

  crossover(partner: IMember) {
    const DNA = [];
    for (let i = 0; i < this.DNA.length; i++) {
      const DNAItem = Math.random() > 0.5 ? this.DNA[i] as number : partner.DNA[i] as number;
      DNA.push(DNAItem);
    }
    return new Member(DNA, { x: 250, y: 400 }, this.color);
  }

  mutate(mutationRate: number) {
    for (let i = 0; i < this.DNA.length; i++) {
      if (mutationRate > getRandomInRange(0, 100)) {
        this.DNA[i] = Math.random();
      }
    }
  }

  move() {
    // const positionXDirection = Math.random();
    // const positionYDirection = Math.random();
    // const positionXRandomDNAIndex = getRandomInRange(0, this.DNA.length);
    // const positionYRandomDNAIndex = getRandomInRange(0, this.DNA.length);
    // const positionXRandomDNA = this.DNA[positionXRandomDNAIndex] as number;
    // const positionYRandomDNA = this.DNA[positionYRandomDNAIndex] as number;
    // positionXDirection > 0.5 ? this.position.x += positionXRandomDNA : this.position.x -= positionXRandomDNA;
    // positionYDirection > 0.5 ? this.position.y += positionYRandomDNA : this.position.y -= positionYRandomDNA;
    const [c0, c1, c2, c3, c4, c5] = this.DNA;
    const { x, y } = this.position;

    this.position.x = (c0! * x) + (c1! * y) + c2!;
    this.position.y = (c3! * x) + (c4! * y) + c5!;
  }

  private generateColor() {
    const r = getRandomInRange(0, 255);
    const g = getRandomInRange(0, 255);
    const b = getRandomInRange(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private loss(targetPoint: Position) {
    const deltaX = this.position.x - targetPoint.x;
    const deltaY = this.position.y - targetPoint.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }
}