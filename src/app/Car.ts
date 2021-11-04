type Color = string;
type Position = { x: number; y: number }
type Size = { width: number; height: number }

export class Car {
  DNA: number[];
  color: Color;
  position: Position;
  size: Size;

  constructor(DNA: number[], position: Position) {
    this.DNA = DNA;
    this.color = this.generateColor();
    this.position = position;
    this.size = { width: 10, height: 10 };
  }

  private generateColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
}