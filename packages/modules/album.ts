import { RequestFunction as RF } from "../declare/modules"

export const albums = function (collect, request) {
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/albums`
  )
} as RF

export const album_$id_detail = function (collect, request) {
  const {
    params
  } = collect

  if (!params || !params.id) {
    throw new Error('专辑 id 不能为空！')
  }

  return request(
    'GET',
    `https://monster-siren.hypergryph.com/api/album/${params.id}/detail`
  )
} as RF<{
  params: Record<string, unknown>
}>

export const album_$id_data = function (collect, request) {
  const {
    params
  } = collect

  if (!params || !params.id) {
    throw new Error('专辑 id 不能为空！')
  }

  return request(
    'GET',
    `https://monster-siren.hypergryph.com/api/album/${params.id}/data`
  )
} as RF<{
  params: { id: string }
}>
