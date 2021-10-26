/**
 * Calculate and draw an angle's lines and arc based on 3 random points
 */
class DrawAngle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public draw() {
    // clear the canvas before next paint
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // get 3 random points
    const [
      [x1, y1],
      [x2, y2],
      [x3, y3]
    ] = this.getRandomPoints(this.canvas.width, this.canvas.height);

    // get vectors from x2,y2 to the other points
    const nx1 = x1 - x2;
    const ny1 = y1 - y2;
    const nx2 = x3 - x2;
    const ny2 = y3 - y2;

    let lineAngle1 = Math.atan2(ny1, nx1);
    let lineAngle2 = Math.atan2(ny2, nx2);

    // use cross product to find correct direction.
    if (nx1 * ny2 - ny1 * nx2 < 0) { // wrong way around swap direction
      const t = lineAngle2;
      lineAngle2 = lineAngle1;
      lineAngle1 = t;
    }

    // if angle 1 is behind then move ahead
    if (lineAngle1 < lineAngle2) {
      lineAngle1 += Math.PI * 2;
    }

    // get lines midpoints
    const [a1, b1] = this.midpoint([x2, y2], [x1, y1]);
    const [a2, b2] = this.midpoint([x2, y2], [x3, y3]);

    // convert midpoints to radius
    const midpoint1 = Math.sqrt( Math.pow((x2 - a1), 2) + Math.pow((y2 - b1), 2) )
    const midpoint2 = Math.sqrt( Math.pow((x2 - a2), 2) + Math.pow((y2 - b2), 2) )

    // use the smaller radius of the two
    const arcRadius = midpoint1 > midpoint2 ? midpoint2 : midpoint1;

    // render the arc
    this.ctx.fillStyle = "pink";
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.arc(x2, y2, arcRadius, lineAngle1, lineAngle2);
    this.ctx.fill();

    // get the angle in degrees
    const angle = (360 - (lineAngle1 - lineAngle2) * (180 / Math.PI)).toFixed(1);

    // positioning factor for angle text
    const n = Number(angle);
    let textFactor: number;
    if (n < 10) {
      textFactor = (45 / n) * 50;
    }
    else if (n < 20) {
      textFactor = (70 / n) * 50;
    }
    else if (n < 60) {
      textFactor = (80 / n) * 50
    }
    else if (n < 90) {
      textFactor = (100 / n) * 50
    }
    else {
      textFactor = (120 / n) * 50
    }

    // get the mid point of the angle
    let mx = -Math.cos((lineAngle1 + lineAngle2) / 2) * textFactor + x2;
    let my = -Math.sin((lineAngle1 + lineAngle2) / 2) * textFactor + y2;

    // if angle is smaller than 5deg, render text at upper left corner
    if (n < 5) {
      mx = 30;
      my = 30;
    }

    // render the angle text
    this.ctx.fillStyle = "black";
    this.ctx.font = "24px arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      angle + String.fromCharCode(176),
      mx,
      my,
    )

    // render the lines
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(x3, y3);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();

    // render arrowheads
    let endRadians1 = Math.atan((y1 - y2) / (x1 - x2));
    endRadians1 += ((x1 > x2) ? 90 : -90) * Math.PI / 180;
    this.drawArrow(this.ctx, x1, y1, endRadians1);

    let endRadians2 = Math.atan((y3 - y2) / (x3 - x2));
    endRadians2 += ((x3 > x2) ? 90 : -90) * Math.PI / 180;
    this.drawArrow(this.ctx, x3, y3, endRadians2);
  }

  /**
   * Get the middle point of a line
   * @param start - [x1, y1] line start
   * @param end - [x2, y2] line end
   */
  private midpoint = ([x1, y1]: number[], [x2, y2]: number[]) =>
    [(x1 + x2) / 2, (y1 + y2) / 2];

  /**
   * Draw the lines' arrowheads
   * @param ctx - canvas context
   * @param x - x position of arrow
   * @param y - y position of arrow
   * @param radians - angle of the arrow
   */
  private drawArrow = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radians: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,-5);
    ctx.lineTo(10,20);
    ctx.lineTo(-10,20);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
  }

  /**
   * Generate 3 random points inside a given rectangle
   * @param w - width of rect
   * @param h - height 0f rect
   */
  private getRandomPoints = (w: number, h: number) => {
    const min = 0;
    return [
      [this.getRandomArbitrary(0, w), this.getRandomArbitrary(min, h)],
      [this.getRandomArbitrary(0, w), this.getRandomArbitrary(min, h)],
      [this.getRandomArbitrary(0, w), this.getRandomArbitrary(min, h)]
    ]
  }

  /**
   * Generate a random number given min and max values
   * @param min - min value
   * @param max - max value
   */
  private getRandomArbitrary = (min: number, max: number) =>
    Math.random() * (max - min) + min;

}

export default DrawAngle;