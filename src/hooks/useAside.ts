import { ref } from "vue";

// 全局状态
const asideState = ref(false);

export default function useAsideState() {
  function setSideFoldState(state: boolean) {
    asideState.value = state;
  }
  return {
    asideState,
    setSideFoldState,
  };
}
