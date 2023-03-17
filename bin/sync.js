/* eslint-disable no-undef */
import axios from "axios"
import fs from "fs/promises"
import path from "path"

const argvSet = new Set(process.argv.slice(2))

async function writeDocs(name, site, data) {
  const str = `来源于：${site}\n\n更新日期：${new Date()}\n\n`
  await fs.writeFile(path.join("./docs/dev", name + ".md"), str + data, "utf-8")
}

async function SyncInfoFromHy(name, site, handler) {
  try {
    const data = handler((await axios.get(site)).data.data)
    await writeDocs(name, site, data)
  } catch (e) {
    throw Error("同步信息错误：" + e)
  }
}

const requestList = [
  {
    name: "已有专辑ID一览",
    site: "https://monster-siren.hypergryph.com/api/albums",
    handler: (data) => {
      let str = ""
      data.forEach(({ cid, name }) => {
        str += `- id: ${cid}，名字：${name}\n`
      })
      return str
    }
  },
  {
    name: "已有歌曲ID一览",
    site: "https://monster-siren.hypergryph.com/api/songs",
    handler: ({ list }) => {
      let str = ""
      list.forEach(({ cid, name }) => {
        str += `- id: ${cid}，名字：${name}\n`
      })
      return str
    }
  }
]

if (argvSet.has("-info")) {
  Promise.all(requestList.map(async ({ name, site, handler }) => {
    await SyncInfoFromHy(name, site, handler)
  }))
  console.log("同步信息至开发文档成功！");
}