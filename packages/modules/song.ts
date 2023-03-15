import { RequestFunction as RF } from "../declare/modules"

export const song_$id = function (collect, request) {
  const {
    params
  } = collect
  if (!params?.id) throw new Error('歌曲id不能为空！')
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/song/${params.id}`
  )
} as RF

export const songs = function (collect, request) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/songs`
  )
} as RF