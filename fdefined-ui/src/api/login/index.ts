import { post } from "../request";
import { ChatInfo } from "./types";

// 登录接口
export function login<T>(data: ChatInfo) {
  return post<T>("/login", data);
}
