type Size = { width: number; height: number };
type Point = { x: number; y: number };

export interface IGraphic {
  addPoint(x: number, y: number): void;
}

export class Graphic implements IGraphic {
  private readonly context: CanvasRenderingContext2D;
  private readonly size: Size;
  private readonly offset: number;
  private readonly dotMargin: number;
  private readonly points: Point[];

  constructor() {
    this.context = this.getRenderContext("graphic");
    this.size = { width: this.context.canvas.width, height: this.context.canvas.height };
    this.offset = 20;
    this.dotMargin = 20;
    this.points = [];
    this.drawAxis();
  }

  addPoint(x: number, y: number) {
    this.points.push({ x, y });
    this.redraw();
  }

  private drawPoint(x: number, y: number) {
    const axisX = this.getX(x);
    const axisY = this.getY(y);
    this.context.moveTo(axisX, axisY);
    this.context.arc(axisX, axisY, 2, 0, 360);
    this.context.stroke();
    this.drawXLabel(x.toString(), axisX);
    this.drawYLabel(y.toString(), axisX, axisY);
  }

  private redraw() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
    this.drawAxis();
    this.points.forEach(point => this.drawPoint(point.x, point.y));
  }

  private drawAxis() {
    this.context.moveTo(this.offset, this.offset);
    this.context.lineTo(this.offset, this.size.height - this.offset);
    this.context.lineTo(this.size.width - this.offset, this.size.height - this.offset);
    this.context.stroke();
  }

  private drawXLabel(label: string, x: number) {
    const workSpace = this.size.height;
    this.context.fillText(label, x, workSpace);
  }

  private drawYLabel(label: string, x: number, y: number) {
    this.context.fillText(label, x - 10, y - 10);
  }

  private getX(value: number) {
    return value * this.dotMargin + this.offset;
  }

  private getY(value: number) {
    const workSpace = this.size.height - (this.offset * 2);
    const maxValue = 1
    const percentByMaxValue = maxValue / 100;
    const percentByValue = value / percentByMaxValue;
    const percentByWorkspace = workSpace / 100;
    const point = workSpace - percentByValue * percentByWorkspace;
    return point;
  }

  private getRenderContext(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) return context;
    }
    throw new Error("Can't get canvas element");
  }
}