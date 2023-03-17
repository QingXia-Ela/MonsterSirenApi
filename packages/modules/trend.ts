import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from "../utils/request"

type SR = string | number

export const recommends = function (o) {
  const { request = r } = o ?? {}
  return request(
    "get",
    "https://monster-siren.hypergryph.com/api/recommends"
  )
} as RF

export const news = function (o) {
  const { request = r, lastCid } = o ?? {}
  return request(
    "get",
    "https://monster-siren.hypergryph.com/api/news",
    {
      params: { lastCid }
    }
  )
} as RF<{
  /** 上次请求中列表最后一项新闻的 id */
  lastCid?: SR
}>

export const news_$id = function (o) {
  const { request = r, id } = o ?? {}
  if (!id) throw new Error("新闻id不能为空！")

  return request(
    "get",
    `https://monster-siren.hypergryph.com/api/news/${id}`,
  )
} as RF<{
  /** 新闻 id */
  id: SR
}>