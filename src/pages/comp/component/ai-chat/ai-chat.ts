import { defineStore } from "pinia"
import { supportedPlatformList, platformOfCredentialFormModel, } from "./request"
import type { SupportedPlatForm, CredentialFormItem } from "./request"

type FormState = { [key: string]: string }

export default defineStore('ai-chat', () => {
  const supportedPlatForms = ref<SupportedPlatForm[]>([])
  const credentialFormModel = ref<CredentialFormItem[]>([])
  const formState = ref<FormState>({})

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
   * @param platformId 平台id
   */
  async function getPlatformOfCredentialFormModel(platformId: string) {
    try {
      const { code, data } = await platformOfCredentialFormModel(platformId)
      if (code === 200) {
        credentialFormModel.value = data
        data.forEach(v => { Object.assign(formState.value, { [`${v.name}`]: '' }) })
      } else {
        credentialFormModel.value = []
      }
    } catch (error) {
    }
  }

  return {
    formState,
    supportedPlatForms,
    credentialFormModel,
    getSysSupportedPlatforms,
    getPlatformOfCredentialFormModel
  }
}, {
  persist: true // 启用持久化
})