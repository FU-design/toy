
export interface SupportedPlatForm {
  "id": string | number,
  "name": string,
  "supportModels": string,
  "authCredential": string
}

export interface CredentialFormItem {
  name: string,
  displayName: string
}

export interface AuthCredential {
  key: string
  value: string
}

export interface CredentialTest {
  platformId: string | number,
  authCredentials: AuthCredential[],
}

export interface Platform {
  id: string | number,
  name: string
  supportModels: string,
}

interface Response<T> {
  code: number,
  message: string,
  data: T
}

// 获取当前支持的平台列表
export function supportedPlatformList(): Promise<Response<SupportedPlatForm[]>> {
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
    }, 1000)
  })
}
export function platformOfCredentialFormModel(platformId: string | number): Promise<Response<CredentialFormItem[]>> {
  console.log('platformId :>> ', platformId);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(
        {
          code: 200,
          message: '',
          data: (new Array(4).fill(1)).map((_v, idx) => {
            return {
              "name": `name${idx + 1}`,
              "displayName": `label${idx + 1}`
            }
          })
        })
    }, 2000)
  })
}

export function platformOfCredentialTest(params: CredentialTest): Promise<Response<Platform>> {
  console.log('params :>> ', params);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: 'success',
        data: {
          id: 0,
          name: 'test',
          supportModels: 'gpt-3.5-turbo'
        }
      })
    }, 2000)
  })
}
