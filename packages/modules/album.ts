import { RequestFunction as RF } from "../declare/modules"
import { ProxyRequestUtil as r } from '../utils/request'

export const albums = function (o) {
  const {
    request = r
  } = o ?? {}
  return request(
    'get',
    `https://monster-siren.hypergryph.com/api/albums`
  )
} as RF

export const album_$id_detail = function (o) {
  const {
    request = r,
    id
  } = o ?? {}
  if (!id) {
    throw new Error('专辑 id 不能为空！')
  }

  return request(
    'GET',
    `https://monster-siren.hypergryph.com/api/album/${id}/detail`
  )
} as RF<{
  id: string
}>

export const album_$id_data = function (o) {
  const {
    request = r,
    id
  } = o ?? {}

  if (!id) {
    throw new Error('专辑 id 不能为空！')
  }

  return request(
    'GET',
    `https://monster-siren.hypergryph.com/api/album/${id}/data`
  )
} as RF<{
  id: string
}>
