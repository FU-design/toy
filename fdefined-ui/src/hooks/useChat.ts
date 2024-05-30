import { onMounted, ref, type Ref, unref } from "vue";

export interface ChatInfo {
  chatCode: string;
  chatName: string;
}

interface Chat {
  chatInfo: Ref<ChatInfo | null>;
  setChatInfo: (info: ChatInfo) => void;
}

export default function useChat(): Chat {
  const chatInfo = ref<ChatInfo | null>(null);

  function setChatInfo(info: ChatInfo | null) {
    if (!info) return;
    chatInfo.value = info;
    localStorage.setItem("myChat", JSON.stringify(unref(chatInfo)));
  }

  function checkChatInfoExists() {
    let chat = localStorage.getItem("myChat");
    if (chat) {
      setChatInfo(JSON.parse(chat));
    }
  }

  onMounted(() => {
    checkChatInfoExists();
  });

  return {
    chatInfo,
    setChatInfo,
  };
}
