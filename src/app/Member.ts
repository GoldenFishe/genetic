import {getRandomInRange} from "./utils";

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Color = string;
type Signal = 1 | 0 | -1;

export interface IMember {
    DNA: number[];
    position: Position;
    color: Color;
    size: Size;
    fitnessValue: number;
    isDead: boolean;
    debug: boolean;

    fitness(targetPoint: Position): number;

    crossover(partner: IMember): IMember;

    mutate(mutationRate: number): void;

    move(): void;

    kill(): void;
}

export class Member implements IMember {
    readonly DNA: number[];
    readonly position: Position;
    readonly color: Color;
    readonly size: Size;
    fitnessValue: number;
    isDead: boolean;
    debug: boolean;

    constructor(DNA: number[], position: Position, color?: Color) {
        this.DNA = DNA;
        this.position = position;
        this.color = color || this.generateColor();
        this.size = {width: 10, height: 10};
        this.fitnessValue = 0;
        this.isDead = false;
        this.debug = false;
    }

    fitness(targetPoint: Position) {
        const loss = this.loss(targetPoint);
        this.fitnessValue = 1 / (loss + 1);
        return this.fitnessValue;
    }

    crossover(partner: IMember) {
        const DNA = [];
        const position = {x: getRandomInRange(0, 500), y: getRandomInRange(0, 500)};
        for (let i = 0; i < this.DNA.length; i++) {
            const DNAItem = Math.random() > 0.5 ? this.DNA[i] as number : partner.DNA[i] as number;
            DNA.push(DNAItem);
        }
        return new Member(DNA, position, this.color);
    }

    mutate(mutationRate: number) {
        for (let i = 0; i < this.DNA.length; i++) {
            if (mutationRate > getRandomInRange(0, 100)) {
                this.DNA[i] = Math.random();
            }
        }
    }

    move() {
        // const [c0, c1, c2, c3, c4, c5] = this.DNA;
        //
        // const xRawSignal = (c0! * x) + (c1! * y) + c2!;
        // const yRawSignal = (c3! * x) + (c4! * y) + c5!;
        //
        // const xSigmoidSignal = this.sigmoid(xRawSignal);
        // const ySigmoidSignal = this.sigmoid(yRawSignal);
        //
        // this.position.x -= this.convertToSignal(xSigmoidSignal);
        // this.position.y -= this.convertToSignal(ySigmoidSignal);
        //
        // this.log(this.DNA)
        // this.log((c0! * x))
        // this.log((c1! * y))
        // this.log({c2})
        // this.log({xRawSignal})
        // this.log({xSigmoidSignal})
        // this.log({convertToSignal: this.convertToSignal(xSigmoidSignal)})

        const targetPoint = { x: 250, y: 50 };
        const deltaX = (this.position.x - targetPoint.x);
        const deltaY = (this.position.y - targetPoint.y);
        const [c0, c1, c2, c3] = this.DNA;

        const xRawSignal = (c0! * deltaX) + c1!;
        const yRawSignal = (c2! * deltaY) + c3!;

        const xSigmoidSignal = this.sigmoid(xRawSignal);
        const ySigmoidSignal = this.sigmoid(yRawSignal);

        this.position.x -= this.convertToSignal(xSigmoidSignal);
        this.position.y -= this.convertToSignal(ySigmoidSignal);

        this.log(this.DNA)
        this.log({deltaX})
        this.log({xRawSignal})
        this.log({xSigmoidSignal})
        this.log({signal: this.convertToSignal(xSigmoidSignal)})
    }

    kill() {
        this.isDead = true;
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

    private sigmoid(x: number): number {
        return 1 / (1 + Math.E ** -x);
    }

    private convertToSignal(sigmoidValue: number, margin: number = 0.4): Signal {
        if (sigmoidValue < (0.5 - margin)) {
            return -1;
        }
        if (sigmoidValue > (0.5 + margin)) {
            return 1;
        }
        return 0;
    }

    private log(message: any) {
        if (this.debug) {
            console.log(message)
        }
    }
}