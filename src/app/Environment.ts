import { IMember } from "./Member";
import { IPopulation } from "./Population";

type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IEnvironment {
  population: IPopulation;

  nextDay(): void;
}

export class Environment implements IEnvironment {
  private readonly bounds: Bounds;
  readonly population: IPopulation;
  private day: number;

  constructor(bounds: Bounds, population: IPopulation) {
    this.bounds = bounds;
    this.population = population;
    this.day = 0;
  }

  nextDay() {
    if (this.day === this.population.lifetime) {
      this.population.evolve();
      this.day = 0;
    }
    this.population.tick(this.day);
    this.killMembers();
    this.day += 1;
  }

  private killMembers() {
    this.population.members.forEach(member => this.isOutOfBounds(member) && this.killMember(member));
  }

  private isOutOfBounds(member: IMember) {
    const { x, y } = member.params.position;
    const outOfX = x < this.bounds.x || x > this.bounds.width;
    const outOfY = y < this.bounds.y || y > this.bounds.height;
    return outOfX || outOfY;
  }

  private killMember(member: IMember) {
    member.isDead = true;
    member.fitnessValue -= 1;
  }
}