import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const song_$id = function (collect, request = r) {
  const {
    params
  } = collect
  if (!params?.id) throw new Error('歌曲id不能为空！')
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/song/${params.id}`
  )
} as RF

export const songs = function (collect, request = r) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/songs`
  )
} as RF