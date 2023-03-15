import { RequestFunction as RF } from "../declare/modules"

export const fontset = function (c, request) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/fontset`
  )
} as RF
