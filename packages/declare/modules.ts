import { AxiosResponse, Method } from "axios"

type RO = Record<string, any>

export interface RequestConfig {
  /** GET 请求后携带的参数，等价于 URL 后直接请求的参数 */
  params?: RO
  /** 等价于 POST 请求中的内容体 */
  body?: RO
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
