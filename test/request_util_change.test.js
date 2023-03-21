/* eslint-disable no-undef */
import { albums } from "../dist/api.js"
import assert from "assert"

describe("测试重写请求体方法", () => {
  it("普通重写", (done) => {
    albums({
      request: async (m, u, o) => m
    }).then(
      /** @param {string} val */
      (val) => {
        assert.equal(val.toLowerCase(), 'get')
        done()
      })
  })
})
