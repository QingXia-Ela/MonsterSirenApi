/* eslint-disable no-undef */
import assert from "assert";
import judgeCorrectPath from "../dist/packages/utils/judgeCorrectPath.js"

describe("测试路径转换是否正确", () => {
  it("/search => /search", () => {
    assert.equal(judgeCorrectPath("/search", "/search"), true)
  })

  it("/search => /search?t=1", () => {
    assert.equal(judgeCorrectPath("/search", "/search?t=1"), true)
  })

  it("/search/:id => /search/114?t=1", () => {
    assert.equal(judgeCorrectPath("/search/:id", "/search/114?t=1"), true)
  })

  it("/search/:id/res => /search/114?t=1", () => {
    assert.equal(judgeCorrectPath("/search/:id/res", "/search/114?t=1"), false)
  })

  it("/:id/search => /114/search?t=1", () => {
    assert.equal(judgeCorrectPath("/search/:id", "/search/114?t=1"), true)
  })

  it("/search/:id/album => /search/114/albmu?t=1", () => {
    assert.equal(judgeCorrectPath("/search/:id/album", "/search/114/albmu?t=1"), false)
  })

  it("/search/:id/:tag/album => /search/114/rock/album?t=1", () => {
    assert.equal(judgeCorrectPath("/search/:id/:tag/album", "/search/114/rock/album?t=1"), true)
  })
})
