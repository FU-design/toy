import { post } from "../request";
import type { ChatInfo } from "./types";

// 登录接口
export function login(data: ChatInfo) {
  return post<ChatInfo>("/login", data);
}
