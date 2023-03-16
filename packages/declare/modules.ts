import { AxiosRequestConfig, AxiosResponse, Method } from "axios"

export type RequestUtil = (
  method: Method,
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => Promise<AxiosResponse>

export type RequestOptions<T> = {
  request: RequestUtil,
} & T

export type RequestFunction<T = Record<string, any>> = (
  options: RequestOptions<T>
) => ReturnType<RequestUtil>

export interface SingleModule {
  route: string,
  mark: string,
  handler: RequestFunction
}
