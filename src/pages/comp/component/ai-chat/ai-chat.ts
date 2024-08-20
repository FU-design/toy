import { defineStore } from "pinia"
import { supportedPlatformList, type SupportedPlatForm } from "./request"

export default defineStore('ai-chat', () => {
  const supportedPlatForms = ref<SupportedPlatForm[]>([])

  async function getSysSupportedPlatforms() {
    const { code, data } = await supportedPlatformList()
    if (code == 200) {
      supportedPlatForms.value = data
    } else {
      supportedPlatForms.value = []
    }
  }

  return {
    supportedPlatForms,
    getSysSupportedPlatforms
  }
})