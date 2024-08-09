
export class ObserverInfiniteScroll {

  loadingFlag: Element | null | undefined
  options: IntersectionObserverInit | undefined
  scrollObersver: IntersectionObserver | undefined
  private func: () => void

  constructor(loadingFlag: Element | null | undefined, func: () => void, options: IntersectionObserverInit | undefined) {
    this.loadingFlag = loadingFlag
    this.options = options
    this.func = func
    this.obersverScroll()
  }

  private obersverScroll() {
    console.log('this.loadingFlag :>> ', this.loadingFlag);
    if (!this.loadingFlag) return
    this.scrollObersver = new IntersectionObserver(this.intersectionCallback, this.options);
    this.scrollObersver.observe(this.loadingFlag)
  }

  private intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    console.log('entries :>> ', entries);
    this.func()
  }


  clearUpObersever() {
    if (!this.loadingFlag) return
    this.scrollObersver?.disconnect()
  }
}





