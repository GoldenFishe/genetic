import {IMember, Member} from "./Member";
import {getRandomInRange} from "./utils";
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
        this.reproduce();
        this.generation += 1;
        console.log(Math.max(...this.members.map(m => m.fitnessValue)));
    }

    tick() {
        this.members.forEach(member => !member.isDead && member.move());
        this.killMembers();
        if (this.isPopulationDead()) {
            this.evolve();
        }
    }

    isPopulationDead() {
        return this.members.every(member => member.isDead);
    }

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
        const members = new Array(amount).fill(null).map(() => {
            const DNA = this.generateDNA(4);
            const position = {x: getRandomInRange(0, 500), y: getRandomInRange(0, 500)};
            return new Member(DNA, position);
        });
        members[0]!.debug = true;
        return members
    }

    private generateDNA(length: number) {
        return new Array(length).fill(0).map(() => Math.random());
    }

    private killMembers() {
        const bounds = {x: 0, y: 0, width: 500, height: 500};

        for (let member of this.members) {
            const outOfX = member.position.x < bounds.x || member.position.x > bounds.width;
            const outOfY = member.position.y < bounds.y || member.position.y > bounds.height;
            if (outOfX || outOfY) {
                member.kill();
            }
        }
    }
}