import { defineStore } from "pinia"
import { supportedPlatformList, platformOfCredentialFormModel, platformOfCredentialTest, newThreadCreate, } from "./request"
import type { SupportedPlatForm, CredentialFormItem, AuthCredential, Platform, ThreadCondition, ThreadInfo } from "./request"


export default defineStore('ai-chat', () => {
  const supportedPlatForms = ref<SupportedPlatForm[]>([])
  const credentialFormModel = ref<CredentialFormItem[]>([])
  const threads = ref<ThreadInfo[]>([])
  const loading = ref(false)
  const currPlatform = ref<Platform>()
  const currThread = ref<ThreadInfo>()


  function updateCurrPlatform(platform: Platform) {
    currPlatform.value = platform
  }

  function updateCurrThread(thread: ThreadInfo) {
    currThread.value = thread
  }

  function updateThreads(thread: ThreadInfo) {
    const threadIds = threads.value.map(v => v.threadId)
    if (threadIds.includes(thread.threadId)) {
      threads.value.push(thread)
    }
  }

  /**
   * 获取系统可支持的ai平台
   */
  async function getSysSupportedPlatforms() {
    try {
      const { code, data } = await supportedPlatformList()
      if (code === 200) {
        supportedPlatForms.value = data
      } else {
        supportedPlatForms.value = []
      }
    } catch (error) {
      console.log('error :>> ', error);
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
      const { code, data } = await platformOfCredentialFormModel(currPlatform.value?.id)
      if (code === 200) {
        credentialFormModel.value = data
      } else {
        credentialFormModel.value = []
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  async function testAuthofPlatform(authFormData = {}) {
    try {
      if (!currPlatform.value?.id) {
        return
      }
      const authCredentials: AuthCredential[] = []
      const platformId = currPlatform.value?.id
      for (const [key, value] of Object.entries(authFormData)) {
        authCredentials.push({ key, value } as AuthCredential)
      }
      const { code, data } = await platformOfCredentialTest({ platformId, authCredentials })
      if (code === 200) updateCurrPlatform(data)
    } catch (error) {
      console.log('error :>> ', error);
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

  return {
    loading,
    currPlatform,
    currThread,
    supportedPlatForms,
    credentialFormModel,
    updateCurrPlatform,
    getSysSupportedPlatforms,
    getPlatformofCredentialFormModel,
    testAuthofPlatform,
    createThreadofChat
  }
}, {
  persist: true // 启用持久化
})