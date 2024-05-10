import { ref, Ref } from "vue";

interface AsideState {
  asideState: Ref<boolean>;
  setSideFoldState: (state: boolean) => void;
}

// 全局状态
const asideState = ref(false);

export default function useAsideState(): AsideState {
  function setSideFoldState(state: boolean) {
    asideState.value = state;
  }
  return {
    asideState,
    setSideFoldState,
  };
}
