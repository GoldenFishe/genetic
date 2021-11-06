export type Direction = 1 | 0 | -1;

export type Gene = {
  x: Direction;
  y: Direction;
};

export type Genes = Gene[];

export interface IDNA {
  genes: Genes;
}

export class DNA implements IDNA {
  genes: Genes;

  constructor(length: number, genes?: Genes) {
    this.genes = genes || this.generateGenes(length);
  }

  static generateGen(): Gene {
    return {
      x: Math.random() > 0.5 ? 1 : -1,
      y: Math.random() > 0.5 ? 1 : -1
    };
  }

  private generateGenes(length: number) {
    return new Array(length).fill(0).map(() => DNA.generateGen());
  }
}