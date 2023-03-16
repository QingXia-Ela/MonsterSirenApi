import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

type SR = string | number

export const recommends = function ({ request = r }) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/recommends`
  )
} as RF

export const news = function ({ request = r, lastCid }) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/news`,
    {
      params: { lastCid }
    }
  )
} as RF<{
  lastCid?: SR
}>

export const news_$id = function ({ request = r, id, lastCid }) {

  if (!id) throw new Error('新闻id不能为空！')

  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/news/${id}`,
    {
      params: { lastCid }
    }
  )
} as RF<{
  id: SR,
  lastCid?: SR
}>