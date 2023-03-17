import { AxiosResponse } from "axios"
import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from "../utils/request"

interface AlbumId {
  /**
   * 专辑 id
   * @see https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E5%B7%B2%E6%9C%89%E4%B8%93%E8%BE%91ID%E4%B8%80%E8%A7%88.md
   */
  id: string | number
}

export const albums = function (o) {
  const {
    request = r
  } = o ?? {}
  return request(
    "get",
    "https://monster-siren.hypergryph.com/api/albums"
  )
} as RF


export const album_$id_detail = function (o) {
  const {
    request = r,
    id
  } = o ?? {}
  if (!id) {
    throw new Error("专辑 id 不能为空！")
  }

  return request(
    "GET",
    `https://monster-siren.hypergryph.com/api/album/${id}/detail`
  )
} as RF<AlbumId>

export const album_$id_data = function (o) {
  const {
    request = r,
    id
  } = o ?? {}

  if (!id) {
    throw new Error("专辑 id 不能为空！")
  }

  return request(
    "GET",
    `https://monster-siren.hypergryph.com/api/album/${id}/data`
  )
} as RF<AlbumId>
