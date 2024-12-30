import { ref, reactive, nextTick } from 'vue'

const useScrollLoad = (pageSize: number = 10) => {
  const containerRef = ref<HTMLElement>()
  const total = ref(0)
  const pageState = reactive({
    pageNum: 1,
    pageSize
  })

  const checkContainerHasScroll = (loadMore: (...args: any) => void) => {
    if (!containerRef.value) {
      return
    }
    const { scrollHeight, clientHeight } = containerRef.value
    if (scrollHeight <= clientHeight) {
      loadMore()
    }
  }

  const loadMore = (getMoreData: (...args: any) => void) => {
    if (pageState.pageNum * pageState.pageSize >= total.value) {
      console.log('No more data to load.')
      return
    }
    pageState.pageNum = pageState.pageNum + 1
    getMoreData()
    nextTick(() => {
      checkContainerHasScroll(getMoreData)
    })
  }

  return {
    containerRef,
    pageState,
    total,
    loadMore
  }
}

export default useScrollLoad
