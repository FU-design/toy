import { ChatInfo } from "@/api/login/types";
import { defineStore } from "pinia";
import { ref } from "vue";

// setup store （$reset需要自己创建）
export default defineStore(
  "auth",
  () => {
    const chatInfo = ref<ChatInfo | null>(null);

    function setChatInfo(info: ChatInfo | null) {
      if (!info) return;
      chatInfo.value = info;
    }

    function $reset() {
      chatInfo.value = null;
    }

    return { chatInfo, setChatInfo, $reset };
  },
  // 持久化配置
  {
    persist: {
      key: "auth",
      storage: localStorage,
    },
  }
);
