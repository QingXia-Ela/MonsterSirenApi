import { AxiosRequestConfig, AxiosResponse, Method } from "axios"

export type RequestUtil = (
  method: Method,
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => Promise<AxiosResponse>

export type RequestFunction<T = object> = (
  args: Record<string, unknown> & T,
  request: RequestUtil
) => ReturnType<typeof request>

export interface SingleModule {
  route: string,
  handler: RequestFunction
}
