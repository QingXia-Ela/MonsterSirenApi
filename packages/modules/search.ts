import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const search = function ({ request = r, keyword }) {

  if (!keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search`,
    {
      params: { keyword }
    }
  )

} as RF<{ keyword: string }>

export const search_album = function ({ request = r, keyword, lastCid }) {

  if (keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search/album`,
    {
      params: { keyword, lastCid }
    }
  )
} as RF<{ keyword: string, lastCid?: string }>

export const search_news = function ({ request = r, keyword, lastCid }) {

  if (!keyword) {
    throw new Error('搜索关键词不能为空！')
  }

  return request('get',
    `https://monster-siren.hypergryph.com/api/search/news`,
    {
      params: { keyword, lastCid }
    }
  )
} as RF<{ keyword: string, lastCid?: string }>
