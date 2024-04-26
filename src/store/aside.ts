import { defineStore } from "pinia";
import { ref } from "vue";

// options store
// export default defineStore("side", {
//   state: () => ({ fold: true }),
//   getters: {},
//   actions: {
//     setSideFoldState(state: boolean) {
//       this.fold = state;
//     },
//   },
// persist: {
// ...配置
// },
// });

// setup store （$reset需要自己创建）
export default defineStore(
  "aside",
  () => {
    const fold = ref(false);

    function setSideFoldState(state: boolean) {
      fold.value = state;
    }

    function $reset() {
      fold.value = false;
    }

    return { fold, setSideFoldState, $reset };
  },
  // 持久化配置
  {
    persist: {
      key: "aside",
      storage: sessionStorage,
    },
  }
);
