import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const fontset = function (c, request = r) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/fontset`
  )
} as RF
