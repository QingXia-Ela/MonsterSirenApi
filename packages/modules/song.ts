import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const song_$id = function (o) {
  const { request = r, id } = o ?? {}
  if (!id) throw new Error('歌曲id不能为空！')
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/song/${id}`
  )
} as RF<{
  /**
   * 歌曲 id
   * @see https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E5%B7%B2%E6%9C%89%E6%AD%8C%E6%9B%B2ID%E4%B8%80%E8%A7%88.md
   */
  id: string | number
}>

export const songs = function (o) {
  const { request = r } = o ?? {}
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/songs`
  )
} as RF