import { defineStore } from "pinia";
import { ref } from "vue";

// options store
// export const useSideStore = defineStore("side", {
//   state: () => ({ fold: true }),
//   getters: {},
//   actions: {
//     setSideFoldState(state: boolean) {
//       this.fold = state;
//     },
//   },
// });

// setup store （$reset需要自己创建）
export const useSideStore = defineStore("side", () => {
  const fold = ref(false);

  function setSideFoldState(state: boolean) {
    fold.value = state;
  }

  function $reset() {
    fold.value = false;
  }

  return { fold, setSideFoldState, $reset };
});
