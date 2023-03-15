import { AxiosRequestConfig, AxiosResponse, Method } from "axios"

export type RequestUtil = (
  method: Method,
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => Promise<AxiosResponse>

export type RequestFunction<T = Record<string, any>> = (
  args: Record<string, unknown> & T,
  request: RequestUtil
) => ReturnType<typeof request>

export interface SingleModule {
  route: string,
  mark: string,
  handler: RequestFunction
}
