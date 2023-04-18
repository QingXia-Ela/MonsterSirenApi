import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from "../utils/request"
import { BasicResponse } from "../declare/modules"

export interface SingleFontInfo {
  tt: string
  eot: string
  svg: string
  woff: string
}

export interface FontsetResponse extends BasicResponse {
  data: Record<string, SingleFontInfo>
}

export const fontset = function (o) {
  const { request = r } = o ?? {}
  return request(
    "get",
    "https://monster-siren.hypergryph.com/api/fontset"
  )
} as RF<object, FontsetResponse>
