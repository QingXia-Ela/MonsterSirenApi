import { AxiosResponse, Method } from "axios"

type RO = Record<string, any>

export interface RequestConfig {
  params?: RO
  body?: RO
  query?: RO
}

export type RequestUtil = (
  method: Method,
  url: string,
  requestConfig?: RequestConfig
) => Promise<AxiosResponse | any>

export type RequestOptions<T> = {
  /** 内置 request，不需要传入与覆盖 */
  request?: RequestUtil,
} & T

export type RequestFunction<T = object> = (
  options?: RequestOptions<T>
) => ReturnType<RequestUtil>

export interface SingleModule {
  route: string,
  mark: string,
  handler: RequestFunction
}
