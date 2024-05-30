import { defineStore } from "pinia";
import { ref } from "vue";

// options store
// export default defineStore("side", {
//   state: () => ({ fold: true }),
//   getters: {},
//   actions: {
//     setSideState(state: boolean) {
//       this.fold = state;
//     },
//   },
// persist: {
// ...配置
// },
// });

// setup store （$reset需要自己创建）
export default defineStore(
  "sideState",
  () => {
    const fold = ref(false);

    function setSideState(state: boolean) {
      fold.value = state;
    }

    function $reset() {
      fold.value = false;
    }

    return { fold, setSideState, $reset };
  },
  // 持久化配置
  {
    persist: {
      key: "sideState",
      storage: sessionStorage,
    },
  }
);
