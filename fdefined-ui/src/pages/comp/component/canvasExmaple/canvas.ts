export function initCanvas(ctx: any) {
  // const canvas = document.querySelector("#canvas") as any;
  // if (!canvas.getContext) {
  //   return;
  // }

  // // get the context
  // let ctx = canvas.getContext("2d");

  // set fill and stroke styles

  // draw a rectangle with fill and stroke
  /**
   * @notes ctx.fillRect(x,y,width,height);
   */
  ctx.fillStyle = "#F0DB4F";
  ctx.fillRect(10, 50, 100, 100);

  ctx.fillStyle = "green";
  ctx.fillRect(30, 70, 100, 100);

  ctx.fillStyle = "blue";
  ctx.fillRect(50, 90, 100, 100);

  ctx.fillStyle = "#F9DC5C";
  ctx.fillRect(500, 100, 150, 100);

  ctx.fillStyle = "rgba(0,0,255,0.5)";
  ctx.fillRect(500, 150, 150, -100);
}

export function drawWall(ctx: any, canvasWidth: any, canvasHeight: any) {
  // define brick height and width, and spaces between them
  const bh = 20,
    bw = 50,
    space = 5;

  // calculate the rows and columns of the wall
  const rows = Math.ceil(canvasHeight / (bh + space));
  const columns = Math.ceil(canvasWidth / (bw + space));

  ctx.fillStyle = "rgb(214, 99, 42)";

  for (let r = 0; r < rows; r++) {
    // draw rows
    for (let c = 0; c < columns; c++) {
      if (r % 2) {
        c == 0
          ? ctx.fillRect(c * (bw + space), r * (bh + space), bw / 2, bh)
          : ctx.fillRect(c * (bw + space) - bw / 2, r * (bh + space), bw, bh);
      } else {
        ctx.fillRect(c * (bw + space), r * (bh + space), bw, bh);
      }
    }
  }

  ctx.clearRect(100, 100, 100, 100);
  ctx.clearRect(300, 100, 100, 100);
  ctx.clearRect(500, 100, 100, 100);
  ctx.clearRect(700, 100, 100, 100);
}

export function drawCircleByPath(ctx: any, canvasWidth: any) {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  const x = 40,
    y = canvasWidth / 2,
    space = 10,
    radius = 30,
    arcCount = 6;

  for (let i = 0; i < arcCount; i++) {
    ctx.beginPath();
    ctx.arc(
      x + i * (radius * 2 + space),
      y,
      radius,
      0,
      ((i + 1) * (2 * Math.PI)) / arcCount,
      false
    );
    ctx.stroke();
  }
}

export function drawPath(ctx: any) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(50, 80);

  ctx.lineTo(100, 20);
  ctx.stroke();

  ctx.lineTo(150, 80);
  ctx.stroke();

  ctx.lineTo(200, 80);
  ctx.stroke();

  ctx.lineTo(250, 20);
  ctx.stroke();

  ctx.lineTo(300, 80);
  ctx.stroke();

  ctx.fill();
  ctx.closePath();

  ctx.moveTo(50, 100);

  ctx.lineTo(100, 160);
  ctx.stroke();

  ctx.lineTo(150, 100);
  ctx.stroke();

  ctx.lineTo(200, 100);
  ctx.stroke();

  ctx.lineTo(200, 100);
  ctx.stroke();

  ctx.lineTo(250, 160);
  ctx.stroke();

  ctx.lineTo(300, 100);
  ctx.stroke();

  ctx.fill();
  ctx.closePath();
}

/**
 * 绘制箭头
 * @param ctx
 */
export function drawArrow(ctx: any) {
  ctx.fillStyle = "rgba(50, 109, 222, 0.8)";
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(150, 40);
  ctx.lineTo(180, 60);
  ctx.lineTo(150, 80);
  ctx.lineTo(150, 70);
  ctx.lineTo(50, 70);
  ctx.lineTo(60, 60);
  ctx.lineTo(50, 50);
  ctx.closePath();
  ctx.fill();
}

/**
 * 绘制月亮
 * @param ctx
 */
export function drawMoon(ctx: any) {
  ctx.fillStyle = "#666";
  ctx.beginPath();
  ctx.arc(100, 200, 60, 0, 2 * Math.PI);
  ctx.fill();
  const dotXY = [
    {
      x: 90,
      y: 180,
      r: 8,
    },
    {
      x: 130,
      y: 190,
      r: 15,
    },
    {
      x: 120,
      y: 230,
      r: 8,
    },
    {
      x: 70,
      y: 230,
      r: 8,
    },
  ];

  for (let i = 0; i < dotXY.length; i++) {
    drawDot(ctx, dotXY[i].x, dotXY[i].y, dotXY[i].r);
  }
}

/**
 * 绘制月亮上的小圆点
 * @param ctx
 * @param x
 * @param y
 * @param r
 */
function drawDot(ctx: any, x: any, y: any, r: any) {
  ctx.fillStyle = "rgb(68, 68, 68)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}
