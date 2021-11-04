interface Object {
  position: { x: number, y: number };
  color: string;
  size: { width: number; height: number };
}

export class Drawler {
  context: CanvasRenderingContext2D;
  objects: Object[];

  constructor(context: CanvasRenderingContext2D, objects: Object[]) {
    this.context = context;
    this.objects = objects;
  }

  drawObjects() {
    for (let object of this.objects) {
      const { x, y } = object.position;
      const { width, height } = object.size;
      this.context.fillStyle = object.color;
      this.context.fillRect(x, y, width, height);
    }
  }
}