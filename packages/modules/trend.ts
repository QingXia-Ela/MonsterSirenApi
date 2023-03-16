import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const recommends = function (c, request = r) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/recommends`
  )
} as RF

export const news = function (c, request) {
  const {
    query
  } = c
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/news`,
    {
      params: query
    }
  )
} as RF

export const news_$id = function (c, request = r) {
  const {
    params,
    query
  } = c

  if (!params?.id) throw new Error('新闻id不能为空！')

  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/news/${params.id}`,
    {
      params: query
    }
  )
} as RF