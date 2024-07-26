import router from "@/router";
import axios from "axios";
import useAuthStore from "@/stores/authorization";

import type {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

const baseConfig = {
  baseURL: "http://localhost:3000", // 替换为服务器地址
  timeout: 10000, // 请求超时时间
  headers: { "Content-Type": "application/json" },
};
// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// 请求拦截器&响应拦截器
const request = axiosInstance.interceptors.request;
const response = axiosInstance.interceptors.response;

//请求拦截器
request.use(
  (config) => {
    // 发送请求的时候带上token等等
    const { chatInfo } = useAuthStore();
    const token = chatInfo?.token;
    if (token) {
      config.headers["authorization"] = `${token}`;
    } else {
      router.replace({ name: "LoginChat" });
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // 处理响应错误（令牌(token)到期）
    return Promise.reject(error);
  }
);

export default axiosInstance;
