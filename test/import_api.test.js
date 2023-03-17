/* eslint-disable no-undef */
import { albums, search_news } from "../dist/packages/modules/AllModules.js";

describe("测试 api 是否可以正常导入", () => {
  it("导入部分 api 并尝试使用", (done) => {
    albums().then(({ code }) => {
      if (code == "0") {
        done()
      }
    }).catch((e) => {
      done(e)
    })
  })

  it("携带参数的 api 调用", (done) => {
    search_news({
      keyword: "operation pyrite"
    }).then(({ code }) => {
      if (code == "0") {
        done()
      }
    }).catch((e) => {
      done(e)
    })
  })
})
