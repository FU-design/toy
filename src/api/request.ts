import axiosInstance, { ApiResponse } from '@/utils/server';

const get = <T>(
  url: string,
  params: object = {},
  headers: object = {}
): Promise<ApiResponse<T>> => {
  return axiosInstance.get(url, {
    params,
    headers
  });
};

const post = <T>(url: string, data: object = {}, headers: object = {}): Promise<ApiResponse<T>> => {
  return axiosInstance.post(url, data, {
    headers
  });
};

const put = <T>(url: string, data: object = {}, headers: object = {}): Promise<ApiResponse<T>> => {
  return axiosInstance.put(url, data, {
    headers
  });
};

const del = <T>(url: string, data: object = {}, headers: object = {}): Promise<ApiResponse<T>> => {
  return axiosInstance.delete(url, {
    data,
    headers
  });
};

export { get, post, put, del };
