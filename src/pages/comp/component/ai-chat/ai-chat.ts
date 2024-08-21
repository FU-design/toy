import { defineStore } from "pinia"
import { supportedPlatformList, platformOfCredentialFormModel, platformOfCredentialTest, } from "./request"
import type { SupportedPlatForm, CredentialFormItem, AuthCredential, Platform } from "./request"


export default defineStore('ai-chat', () => {
  const supportedPlatForms = ref<SupportedPlatForm[]>([])
  const credentialFormModel = ref<CredentialFormItem[]>([])
  const loading = ref(false)
  const currPlatform = ref<Platform>()


  function setCurrPlatform(platform: Platform) {
    currPlatform.value = platform
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
    }
  }

  /**
   * 获取平台ID的认证表单字段
   */
  async function getPlatformOfCredentialFormModel() {
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
    }
  }

  async function testAuthOfPlatform(authFormData = {}) {
    if (!currPlatform.value?.id) {
      return
    }
    const authCredentials: AuthCredential[] = []
    const platformId = currPlatform.value?.id
    for (const [key, value] of Object.entries(authFormData)) {
      authCredentials.push({ key, value } as AuthCredential)
    }
    return await platformOfCredentialTest({ platformId, authCredentials })
  }

  return {
    loading,
    currPlatform,
    supportedPlatForms,
    credentialFormModel,
    setCurrPlatform,
    getSysSupportedPlatforms,
    getPlatformOfCredentialFormModel,
    testAuthOfPlatform
  }
}, {
  persist: true // 启用持久化
})