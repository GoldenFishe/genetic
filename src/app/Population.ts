import { IMember, Member } from "./Member";
// import { getRandomInRange } from "./utils";

type TargetPoint = { x: number; y: number };

export interface IPopulation {
  members: IMember[];
  generation: number;
  longLivingRate: number;

  evolve(): void;

  tick(): void;
}

export class Population implements IPopulation {
  members: IMember[];
  private readonly mutationRate: number;
  generation: number;
  targetPoint: TargetPoint;
  longLivingRate: number;

  constructor(amount: number, mutationRate: number, targetPoint: TargetPoint) {
    this.members = this.generateMembers(amount);
    this.mutationRate = mutationRate;
    this.longLivingRate = 10;
    this.generation = 1;
    this.targetPoint = targetPoint;
  }

  evolve() {
    // const matingPool = this.selectMembers();
    // this.reproduce(matingPool);
    this.reproduce();
    this.generation += 1;
    console.log(Math.max(...this.members.map(m => m.fitnessValue)));
  }

  tick() {
    this.members.forEach(member => member.move());
  }

  // private selectMembers() {
  //   const matingPool = [];
  //   for (let member of this.members) {
  //     const percent = member.fitness(this.targetPoint);
  //     console.log(percent);
  //     const membersByPercent = new Array(percent).fill(member);
  //     matingPool.push(...membersByPercent);
  //   }
  //   return matingPool;
  // }

  private reproduce() {
    this.members.sort((a, b) => {
      const aFitness = a.fitness(this.targetPoint);
      const bFitness = b.fitness(this.targetPoint);
      return bFitness - aFitness;
    });
    let longLivingIndex = Math.round(this.members.length / 100 * this.longLivingRate);
    const newMembers = this.members.slice(0, longLivingIndex);
    for (let i = 0; i < this.members.length; i++) {
      if (this.members.length !== newMembers.length) {
        const currentMember = this.members[i] as IMember;
        const nextMember = this.members[i + 1] as IMember;
        const child = currentMember.crossover(nextMember);
        child.mutate(this.mutationRate);
        newMembers.push(child);
      }
    }
    this.members = newMembers;
  }

  private generateMembers(amount: number) {
    return new Array(amount).fill(null).map(() => {
      const DNA = this.generateDNA(6);
      const position = { x: 250, y: 400 };
      return new Member(DNA, position);
    });
  }

  private generateDNA(length: number) {
    return new Array(length).fill(0).map(() => Math.random());
  }
}