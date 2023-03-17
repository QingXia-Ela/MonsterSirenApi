/* eslint-disable no-undef */
import server from "../dist/index.js"

describe("测试服务器是否可以正常开启", () => {
  it("开启服务器", (done) => {
    server().then((s) => {
      if (s) done()
      setTimeout(() => {
        process.exit(0)
      }, 500);
    })
  })
})
