import { RequestFunction as RF } from "../declare/modules"

export const search = function (collect, request) {
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

export const search_album = function (collect, request) {
  const {
    query
  } = collect

  if (!query?.keyword) {
    throw new Error('搜索关键词不能为空！')
  }
  console.log(query);

  return request('get',
    `https://monster-siren.hypergryph.com/api/search/album`,
    {
      params: query
    }
  )
} as RF<{
  query: { keyword: string, lastCid?: string }
}>
