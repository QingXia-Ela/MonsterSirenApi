import { BasicResponse, RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from "../utils/request"

interface Keyword {
  /** 必选，搜索关键词 */
  keyword: string
}

interface LastCid {
  /** 上次请求中的最后子项 */
  lastCid?: string | number
}

export interface SingleAlbumSearchResultItem {
  cid: string
  name: string
  belong: string
  coverUrl: string
  artistes: string[]
}

export interface SingleNewsSearchResultItem {
  cid: string
  title: string
  cate: number
  date: string
}

export interface SearchAlbumResponse {
  list: SingleAlbumSearchResultItem[]
  /** 结束标记 */
  end: boolean
}

export interface SearchNewsResponse {
  list: SingleNewsSearchResultItem[]
  /** 结束标记 */
  end: boolean
}

export interface SearchResponse extends BasicResponse {
  data: {
    albums: SearchAlbumResponse
    news: SearchNewsResponse
  }
}

export const search = function (o) {
  const { request = r, keyword } = o ?? {}

  if (!keyword) {
    throw new Error("搜索关键词不能为空！")
  }

  return request("get",
    "https://monster-siren.hypergryph.com/api/search",
    {
      params: { keyword }
    }
  )

} as RF<Keyword, SearchResponse>

export const search_album = function (o) {
  const { request = r, keyword, lastCid } = o ?? {}

  if (!keyword) {
    throw new Error("搜索关键词不能为空！")
  }

  return request("get",
    "https://monster-siren.hypergryph.com/api/search/album",
    {
      params: { keyword, lastCid }
    }
  )
} as RF<Keyword & LastCid, BasicResponse & {
  data: SearchAlbumResponse
}>

export const search_news = function (o) {
  const { request = r, keyword, lastCid } = o ?? {}

  if (!keyword) {
    throw new Error("搜索关键词不能为空！")
  }

  return request("get",
    "https://monster-siren.hypergryph.com/api/search/news",
    {
      params: { keyword, lastCid }
    }
  )
} as RF<Keyword & LastCid, BasicResponse & {
  data: SearchNewsResponse
}>
