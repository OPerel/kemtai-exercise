/**
 * Generates 3 random points on a given canvas element.
 * Calculates 2 angles from a middle point to the other two.
 * Calculates and renders the arc angle between the two vectors.
 * Renders two lines with arrowheads along the vectors.
 */
class DrawAngle {
  /**
   * Draw an angle's lines and arc based on 3 random points
   * @param canvas - the canvas element
   */
  public draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // clear the canvas before next paint
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // get 3 random points
    const [
      [x1, y1],
      [x2, y2],
      [x3, y3]
    ] = this.getRandomPoints(canvas.width, canvas.height);

    // get vectors from x2,y2 to the other points
    const { lineAngle1, lineAngle2 } = this.getVectors(x1, x2, y1, y2, x3, y3);

    // render the angle's arc
    this.renderArc(ctx, x2, y2, x1, y1, x3, y3, lineAngle1, lineAngle2);

    // render the angle's text
    this.renderAngleText(lineAngle1, lineAngle2, x2, y2, ctx);

    // render the two vectors
    this.renderVectors(ctx, x3, y3, x2, y2, x1, y1);
  }

  /**
   * Calculate two vectors from the middle point
   * @param x1 - first point x position
   * @param x2 - middle point x
   * @param y1 - first point y position
   * @param y2 - middle point y
   * @param x3 - second point x position
   * @param y3 - second point y position
   * @private
   */
  private getVectors(
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    x3: number,
    y3: number
  ) {
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
    return { lineAngle1, lineAngle2 };
  }

  /**
   * Calculate the arc's radius and render it
   * @param ctx - canvas context
   * @param x2 - middle point x
   * @param y2 - middle point y
   * @param x1 - line 1 end x
   * @param y1 - line 1 end y
   * @param x3 - line 2 end x
   * @param y3 - line 2 end y
   * @param lineAngle1 - slope angle of line 1
   * @param lineAngle2 - slope angle of line 2
   * @private
   */
  private renderArc(
    ctx: CanvasRenderingContext2D,
    x2: number,
    y2: number,
    x1: number,
    y1: number,
    x3: number,
    y3: number,
    lineAngle1: number,
    lineAngle2: number
  ) {
    // get lines midpoints
    const [a1, b1] = this.midpoint([x2, y2], [x1, y1]);
    const [a2, b2] = this.midpoint([x2, y2], [x3, y3]);

    // convert midpoints to radius
    const midpoint1 = Math.sqrt(Math.pow((x2 - a1), 2) + Math.pow((y2 - b1), 2))
    const midpoint2 = Math.sqrt(Math.pow((x2 - a2), 2) + Math.pow((y2 - b2), 2))

    // use the smaller radius of the two
    const arcRadius = midpoint1 > midpoint2 ? midpoint2 : midpoint1;

    // render the arc
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.arc(x2, y2, arcRadius, lineAngle1, lineAngle2);
    ctx.fill();
  }

  /**
   *
   * @param lineAngle1 - slope angle of line 1
   * @param lineAngle2 - slope angle of line 2
   * @param x2 - middle point x position
   * @param y2 - middle point y position
   * @param ctx - canvas context
   * @private
   */
  private renderAngleText(
    lineAngle1: number,
    lineAngle2: number,
    x2: number,
    y2: number,
    ctx: CanvasRenderingContext2D
  ) {
    // get the angle in degrees
    const angle = (360 - (lineAngle1 - lineAngle2) * (180 / Math.PI)).toFixed(1);

    // positioning factor for angle text
    const n = Number(angle);
    let textFactor: number;
    if (n < 10) {
      textFactor = (45 / n) * 50;
    } else if (n < 20) {
      textFactor = (70 / n) * 50;
    } else if (n < 60) {
      textFactor = (80 / n) * 50
    } else if (n < 90) {
      textFactor = (100 / n) * 50
    } else {
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
    ctx.fillStyle = "black";
    ctx.font = "24px arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      angle + String.fromCharCode(176),
      mx,
      my,
    )
  }

  /**
   * Render two vectors.
   * Calculate arrowheads positions and angles and render them.
   * @param ctx - canvas context
   * @param x3 - second point x position
   * @param y3 - second point y position
   * @param x2 - middle point x
   * @param y2 - middle point y
   * @param x1 - first point x position
   * @param y1 - first point y position
   * @private
   */
  private renderVectors(
    ctx: CanvasRenderingContext2D,
    x3: number,
    y3: number,
    x2: number,
    y2: number,
    x1: number,
    y1: number
  ) {
    // render the lines
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    // render arrowheads
    this.drawArrow(ctx, x2, y2, x1, y1);
    this.drawArrow(ctx, x2, y2, x3, y3);
  }

  /**
   * Get the middle point of a line
   * @param start - [x1, y1] line start
   * @param end - [x2, y2] line end
   */
  private midpoint = ([x1, y1]: number[], [x2, y2]: number[]) =>
    [(x1 + x2) / 2, (y1 + y2) / 2];

  /**
   * Calculate arrowhead position and angle,
   * and render it.
   * @param ctx
   * @param mx
   * @param my
   * @param endX
   * @param endY
   */
  private drawArrow = (
    ctx: CanvasRenderingContext2D,
    mx: number,
    my: number,
    endX: number,
    endY: number
  ) => {
    let radians = Math.atan((endY - my) / (endX - mx));
    radians += ((endX > mx) ? 90 : -90) * Math.PI / 180;

    ctx.save();
    ctx.beginPath();
    ctx.translate(endX, endY);
    ctx.rotate(radians);
    ctx.moveTo(0, -5);
    ctx.lineTo(10, 20);
    ctx.lineTo(-10, 20);
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
      [this.getRandomArbitrary(min, w), this.getRandomArbitrary(min, h)],
      [this.getRandomArbitrary(min, w), this.getRandomArbitrary(min, h)],
      [this.getRandomArbitrary(min, w), this.getRandomArbitrary(min, h)]
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

export default new DrawAngle();