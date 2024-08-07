export class DrawCanvas {
  canvas: HTMLCanvasElement | null | undefined;
  resizeObserver: ResizeObserver | null | undefined;

  constructor(container: string | HTMLCanvasElement | null) {
    this.initCanvas(container);
  }

  initCanvas(container: string | HTMLCanvasElement | null) {
    if (typeof container === "string") {
      const canvasElement = document.querySelector(container);
      if (canvasElement) {
        this.canvas = canvasElement as HTMLCanvasElement;
      }
    } else if (container instanceof HTMLCanvasElement) {
      this.canvas = container;
    }

    if (!this.canvas) {
      console.error("Canvas element not found");
      return;
    }

    this.initResize();
    this.setCanvasSize();
    this.drawCanvas();
  }

  drawCanvas() {
    if (!this.canvas) {
      return;
    }
  }

  initResize() {
    const parentEl = this.canvas?.parentElement;
    this.resizeObserver = new ResizeObserver(() => {
      this.setCanvasSize();
    });
    if (parentEl) {
      this.resizeObserver.observe(parentEl);
    }
  }

  setCanvasSize() {
    const parentEl = this.canvas?.parentElement;
    if (this.canvas && parentEl) {
      this.canvas.width = parentEl.offsetWidth;
      this.canvas.height = parentEl.offsetHeight;
    }
  }

  destroyedCanvas() {
    this.resizeObserver?.disconnect();
  }
}
