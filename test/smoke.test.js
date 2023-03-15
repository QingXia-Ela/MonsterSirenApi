/* eslint-disable no-undef */
import assert from "assert";

function sum(...rest) {
  var sum = 0
  for (var one of rest) {
    sum += one
  }
  return sum
}

describe("大的组1测试", () => {
  describe("小的组1测试", () => {
    it("sum() 0", () => {
      assert.strictEqual(sum(), 0)//测试用例
    })
  })
  describe("小的组2测试", () => {
    it("sum(1) 1", () => {
      assert.strictEqual(sum(1), 1)
    })
    it("sum(1,2) 3", () => {
      assert.strictEqual(sum(1, 2), 3)
    })
  })
})
