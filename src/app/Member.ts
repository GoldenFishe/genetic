import {getRandomInRange} from "./utils";
import {DNA, Gene, Genes, IDNA} from "./DNA";

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
    isReached: boolean;
    readonly params: Params;
    readonly DNA: IDNA;

    fitness(targetPoint: Position): number;

    crossover(partner: IMember): IMember;

    mutate(mutationRate: number): void;

    liveDay(day: number, targetPoint: Position): void;
}

export class Member implements IMember {
    fitnessValue: number;
    isDead: boolean;
    isReached: boolean;
    readonly params: Params;
    readonly DNA: IDNA;
    private readonly lifetime: number;

    constructor(lifetime: number, position: Position, color?: Color, genes?: Genes) {
        this.params = {
            position: position,
            color: color || this.generateColor(),
            size: {width: 10, height: 10}
        };
        this.fitnessValue = 0;
        this.isDead = false;
        this.isReached = false;
        this.lifetime = lifetime;
        this.DNA = new DNA(lifetime, genes);
    }

    fitness(targetPoint: Position) {
        const loss = this.loss(targetPoint);
        this.fitnessValue += 1 / (loss + 1);
        return this.fitnessValue;
    }

    crossover(partner: IMember) {
        const DNA = [];
        const position = {x: 250, y: 400};
        for (let i = 0; i < this.DNA.genes.length; i++) {
            const DNAItem = Math.random() > 0.5 ? this.DNA.genes[i] as Gene : partner.DNA.genes[i] as Gene;
            DNA.push(DNAItem);
        }
        return new Member(this.lifetime, position, '', DNA);
    }

    mutate(mutationRate: number) {
        for (let i = 0; i < this.DNA.genes.length; i++) {
            if (mutationRate > getRandomInRange(0, 100)) {
                this.DNA.genes[i] = DNA.generateGen();
            }
        }
    }

    liveDay(day: number, targetPoint: Position) {
        const gene = this.DNA.genes[day];
        if (gene) {
            this.params.position.x += gene.x * 5;
            this.params.position.y += gene.y * 5;
        }
        if (this.params.position.x > targetPoint.x &&
            this.params.position.x < targetPoint.x + 20 &&
            this.params.position.y > targetPoint.y &&
            this.params.position.y < targetPoint.y + 20) {
            console.log({match: this});
            this.fitnessValue += 1;
            this.isReached = true;
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