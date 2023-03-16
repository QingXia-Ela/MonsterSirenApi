import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const song_$id = function ({ request = r, id }) {
  if (!id) throw new Error('歌曲id不能为空！')
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/song/${id}`
  )
} as RF<{
  id: string | number
}>

export const songs = function ({ request = r }) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/songs`
  )
} as RF