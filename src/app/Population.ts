import { IMember, Member } from "./Member";
import { getRandomInRange } from "./utils";
import { graphic } from "../index";

type TargetPoint = { x: number; y: number };

export interface IPopulation {
  members: IMember[];
  generation: number;
  readonly lifetime: number;

  evolve(): void;

  tick(day: number): void;
}

export class Population implements IPopulation {
  members: IMember[];
  generation: number;
  readonly lifetime: number;
  private readonly mutationRate: number;
  private readonly targetPoint: TargetPoint;

  constructor(amount: number, mutationRate: number, lifetime: number, targetPoint: TargetPoint) {
    this.generation = 1;
    this.lifetime = lifetime;
    this.mutationRate = mutationRate;
    this.targetPoint = targetPoint;
    this.members = this.generateMembers(amount);
  }

  evolve() {
    this.reproduce();
    this.generation += 1;
  }

  tick(day: number) {
    this.members.forEach(member => !member.isDead && member.liveDay(day, this.targetPoint));
  }

  private selection() {
    const matingPool = [];
    for (const member of this.members) {
      let n = Math.floor(member.fitness(this.targetPoint) * 1000);
      for (let i = 0; i < n; i++) {
        matingPool.push(member);
      }
    }
    const maxFitnessValue = Math.max(...this.members.map(member => member.fitnessValue));

    graphic.addPoint(this.generation, Number.parseFloat(maxFitnessValue.toFixed(4)))

    return matingPool;
  }

  private reproduce() {
    const matingPool = this.selection();
    console.log(matingPool);
    for (let i = 0; i < this.members.length; i++) {
      const mummyIndex = getRandomInRange(0, matingPool.length);
      const daddyIndex = getRandomInRange(0, matingPool.length);

      const mummy = matingPool[mummyIndex];
      const daddy = matingPool[daddyIndex];
      if (mummy && daddy) {
        let child = mummy.crossover(daddy);
        child.mutate(this.mutationRate);
        this.members[i] = child;
      }
    }
  }

  private generateMembers(amount: number) {
    return new Array(amount).fill(null).map(() => {
      const position = { x: 250, y: 400 };
      return new Member(this.lifetime, position);
    });
  }
}