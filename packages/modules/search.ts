import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const search = function (collect, request = r) {
  const {
    query
  } = collect

  if (!query?.keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search`,
    {
      params: query
    }
  )

} as RF<{
  query: { keyword: string }
}>

export const search_album = function (collect, request = r) {
  const {
    query
  } = collect

  if (!query?.keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search/album`,
    {
      params: query
    }
  )
} as RF<{
  query: { keyword: string, lastCid?: string }
}>

export const search_news = function (collect, request = r) {
  const {
    query
  } = collect

  if (!query?.keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search/news`,
    {
      params: query
    }
  )
} as RF<{
  query: { keyword: string, lastCid?: string }
}>
