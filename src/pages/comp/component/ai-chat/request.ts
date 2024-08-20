
export interface SupportedPlatForm {
  "id": string | number,
  "name": string,
  "supportModels": string,
  "authCredential": string
}

interface Response {
  code: number,
  message: string,
  data: SupportedPlatForm[]
}

// 获取当前支持的平台列表
export function supportedPlatformList(): Promise<Response> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(
        {
          code: 200,
          message: '',
          data: [
            {
              "id": 1,
              "name": "OpenAI",
              "supportModels": "GPT-3.5,GPT-4o",
              "authCredential": "API Key"
            },
            {
              "id": 2,
              "name": "ChatGLM",
              "supportModels": "GPT-3.5,GPT-4o",
              "authCredential": "AppKey"
            }
          ]
        })
    }, 500)
  })
}
