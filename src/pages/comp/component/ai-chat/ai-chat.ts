import { defineStore } from "pinia"
import { supportedPlatformList, platformOfCredentialFormModel, platformOfCredentialTest, newThreadCreate, connectAssistant, } from "./request"
import type { SupportedPlatForm, CredentialFormItem, AuthCredential, Platform, ThreadCondition, ThreadInfo, Record } from "./request"


export default defineStore('ai-chat', () => {
  const supportedPlatForms = ref<SupportedPlatForm[]>([])
  const credentialFormModel = ref<CredentialFormItem[]>([])
  const threads = ref<ThreadInfo[]>([])
  const currPlatform = ref<Platform>()
  const currThread = ref<ThreadInfo>()
  const chatRecords = ref<Record[]>([])
  const loading = ref(false)
  const isExpand = ref(false)


  function updateCurrPlatform(platform: Platform) {
    currPlatform.value = platform
  }

  function updateCurrThread(thread: ThreadInfo) {
    currThread.value = thread
  }

  function updateThreads(thread: ThreadInfo) {
    const threadIds = threads.value.map(v => v.threadId)
    if (!threadIds.includes(thread.threadId)) {
      threads.value.push(thread)
    }
  }

  function updateChatRecords(record: Record) {
    chatRecords.value.push(record)
  }

  function setWindowExpandStatus(status: boolean) {
    isExpand.value = status
  }

  /**
   * 获取系统可支持的ai平台
   */
  async function getSysSupportedPlatforms() {
    try {
      loading.value = true
      const { code, data } = await supportedPlatformList()
      if (code === 200) {
        supportedPlatForms.value = data
        loading.value = false
      } else {
        supportedPlatForms.value = []
      }
    } catch (error) {
      console.log('error :>> ', error);
      loading.value = false
    }
  }

  /**
   * 获取平台ID的认证表单字段
   */
  async function getPlatformofCredentialFormModel() {
    try {
      if (!currPlatform.value?.id) {
        return
      }
      loading.value = true
      const { code, data } = await platformOfCredentialFormModel(currPlatform.value?.id)
      if (code === 200) {
        credentialFormModel.value = data
        loading.value = false
      } else {
        credentialFormModel.value = []
      }
    } catch (error) {
      console.log('error :>> ', error);
      loading.value = false
    }
  }

  /**
   * 测试ai平台的授权认证
   * @param authFormData 
   * @returns 
   */
  async function testAuthofPlatform(authFormData = {}) {
    try {
      if (!currPlatform.value?.id) {
        return
      }
      loading.value = true
      const authCredentials: AuthCredential[] = []
      const platformId = currPlatform.value?.id
      for (const [key, value] of Object.entries(authFormData)) {
        authCredentials.push({ key, value } as AuthCredential)
      }
      const { code, data } = await platformOfCredentialTest({ platformId, authCredentials })
      if (code === 200) {
        updateCurrPlatform(data)
        loading.value = false
      }
    } catch (error) {
      console.log('error :>> ', error);
      loading.value = false
    }

  }

  /**
   * 创建新的聊天线程
   * @param platfromInfo 
   */
  async function createThreadofChat(platfromInfo: ThreadCondition) {
    try {
      const { code, data } = await newThreadCreate(platfromInfo)
      if (code === 200) {
        updateThreads(data)
        updateCurrThread(data)
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  /**
   * 与ai建立连接
   * @returns 
   */
  async function startConnectAssistant() {
    if (currThread.value?.threadId) {
      return
    }
    try {
      const { code, data } = await connectAssistant({ threadId: currThread.value?.threadId as (string | number) })
      if (code === 200) {
        updateChatRecords(data)
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  return {
    loading,
    isExpand,
    currPlatform,
    currThread,
    supportedPlatForms,
    credentialFormModel,
    threads,
    chatRecords,
    updateCurrPlatform,
    getSysSupportedPlatforms,
    getPlatformofCredentialFormModel,
    testAuthofPlatform,
    createThreadofChat,
    setWindowExpandStatus,
    startConnectAssistant
  }
}, {
  persist: true // 启用持久化
})