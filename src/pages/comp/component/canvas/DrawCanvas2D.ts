export class DrawCanvas {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  resizeObserver: ResizeObserver | null;
  drawFunc: (ctx: CanvasRenderingContext2D) => void;

  constructor(container: string | HTMLCanvasElement | null, drawFunc: (ctx: CanvasRenderingContext2D) => void) {
    this.canvas = null;
    this.ctx = null;
    this.resizeObserver = null;
    this.drawFunc = drawFunc

    this.initCanvas(container);
  }

  private initCanvas(container: string | HTMLCanvasElement | null) {
    if (typeof container === "string") {
      const canvasElement = document.querySelector(container);
      canvasElement && (this.canvas = canvasElement as HTMLCanvasElement)
    } else if (container instanceof HTMLCanvasElement) {
      this.canvas = container;
    }

    if (!this.canvas) {
      console.error("Canvas element not found");
      return;
    }

    this.ctx = this.canvas.getContext("2d");

    if (!this.ctx) {
      console.error("Failed to get the canvas context");
      return;
    }

    this.initResize();
    // this.setCanvasSize();
    this.drawCanvas();
  }

  private drawCanvas() {
    if (!this.ctx) return;

    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.drawFunc(this.ctx)
  }

  private initResize() {
    const parentEl = this.canvas?.parentElement;
    this.resizeObserver = new ResizeObserver(() => {
      this.setCanvasSize();
      this.drawCanvas(); // 更新画布
    });
    parentEl && this.resizeObserver.observe(parentEl);

  }

  /**
   * 设置画布的大小填充整个父容器
   * 一般canvas默认 pixels（像素） 大小：width：300px; height：150px
   */
  private setCanvasSize() {
    const parentEl = this.canvas?.parentElement;
    if (this.canvas && parentEl) {
      this.canvas.width = parentEl.offsetWidth;
      this.canvas.height = parentEl.offsetHeight;
    }
  }

  /**
   * 销毁画布父容器大小变化的监听
   */
  destroyedCanvas() {
    this.resizeObserver?.disconnect();
  }
}