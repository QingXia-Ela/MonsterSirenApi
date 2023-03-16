/* eslint-disable no-undef */
import assert from "assert";
// import { describe, it } from "node:test";
import { albums } from "../dist/packages/modules/album";

describe('测试 api 是否可以正常导入', () => {
  it('导入部分 api 并尝试使用', (done) => {
    albums().then(({ code }) => {
      if (code == '0') {
        done()
      }
    }).catch((e) => {
      done(e)
    })
  })
})