import {IMember} from "./Member";
import {IPopulation} from "./Population";

type Bounds = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IEnvironment {
    population: IPopulation;
    wall: Bounds;

    nextDay(): void;
}

export class Environment implements IEnvironment {
    wall: Bounds;
    private readonly bounds: Bounds;
    readonly population: IPopulation;
    private day: number;

    constructor(bounds: Bounds, population: IPopulation) {
        this.bounds = bounds;
        this.population = population;
        this.day = 0;
        this.wall = {x: 100, y: 200, width: 300, height: 10};
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
        this.population.members.forEach(member => {
            if (this.isOutOfBounds(member) || this.isCrashedByWall(member)) {
                this.killMember(member)
            }
        });
    }

    private isCrashedByWall(member: IMember) {
        const {x, y} = member.params.position;
        return (
            x > this.wall.x &&
            x < this.wall.x + this.wall.width &&
            y > this.wall.y &&
            y < this.wall.y + this.wall.height
        )
    }

    private isOutOfBounds(member: IMember) {
        const {x, y} = member.params.position;
        const outOfX = x < this.bounds.x || x > this.bounds.width;
        const outOfY = y < this.bounds.y || y > this.bounds.height;
        return outOfX || outOfY;
    }

    private killMember(member: IMember) {
        member.isDead = true;
        member.fitnessValue -= 1;
    }
}