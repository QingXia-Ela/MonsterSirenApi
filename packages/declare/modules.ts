import { Method } from "axios"

type RO = Record<string, any>

export interface RequestConfig {
  /** GET 请求后携带的参数，等价于 URL 后直接请求的参数 */
  params?: RO
  /** 等价于 POST 请求中的内容体 */
  body?: RO
}

export type RequestUtil<U = object> = (
  method: Method,
  url: string,
  requestConfig?: RequestConfig
) => Promise<U>

export type RequestOptions<T, U> = {
  /** 内置 request，不需要传入与覆盖 */
  request?: RequestUtil<U>,
} & T

export type RequestFunction<T = object, U = object> = (
  options?: RequestOptions<T, U>
) => ReturnType<RequestUtil<U>>

export interface SingleModule {
  route: string,
  mark: string,
  handler: RequestFunction
}

/** 基本响应结果 */
export interface BasicResponse {
  code: number,
  msg: string
}
