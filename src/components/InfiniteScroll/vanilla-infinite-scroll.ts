import { throttle } from '@/utils/tool';

export class VanillaInfiniteScroll {
  container: Element | null;
  threshold: number;
  private func: () => void;

  constructor(container: Element | null, func: () => void, threshold: number = 50) {
    this.container = container;
    this.threshold = threshold;
    this.func = func;
    this.obersverScroll();
  }

  private obersverScroll() {
    if (!this.container) return;
    this.container.addEventListener('scroll', throttle(this.onScroll, 100));
  }

  private onScroll = (e: Event) => {
    const targetElement = e.target as Element;
    if (
      targetElement.scrollHeight - targetElement.scrollTop <=
      targetElement.clientHeight + this.threshold
    ) {
      console.log('已到底部 :>> ');
      this.func();
    }
  };

  clearUpObersever() {
    if (!this.container) return;
    this.container?.removeEventListener('scroll', throttle(this.onScroll, 100));
  }
}
