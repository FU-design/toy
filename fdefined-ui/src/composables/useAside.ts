import { ref, type Ref } from "vue";

interface SideState {
  sideState: Ref<boolean>;
  setSideState: (state: boolean) => void;
}

// 全局状态
const sideState = ref(false);

export default function useSideState(): SideState {
  function setSideState(state: boolean) {
    sideState.value = state;
  }
  return {
    sideState,
    setSideState,
  };
}
