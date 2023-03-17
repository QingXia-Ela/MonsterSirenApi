/**
 * @author @liulinboyi
 * Machining by @QingXia-Ela
 * @see https://github.com/liulinboyi/HTMLParser/blob/main/script/addSuffixJs.js
 */

import fs from "fs/promises"
import path from "path"

const markIndexImportSet = new Set()

async function BFS(rootDir, isDirFile, isFile) {
  let p = path.resolve(rootDir)
  let paths = await fs.readdir(p)
  let stack = [...paths]
  while (stack.length) {
    let top = stack.pop()
    let pat = path.resolve(p, top)
    let stat = await fs.stat(pat)

    if (stat.isDirectory()) {
      let temp = await fs.readdir(pat)
      if (temp) {
        for (let i of temp) {
          if (isDirFile && isDirFile(pat, i)) stack.push(path.join(top, i))
        }
      }
    }
    else {
      isFile && isFile(pat)
    }
  }
}

async function handleFile(pat) {
  let personList = await fs.readFile(pat, { encoding: "utf8" })

  var regexpNames = /(?:export|import)(?:\s)*?(?:\{)??.*?(?:\})??(?:\s)*?from(?:\s)*?"(.+?)"/gm

  var match = personList.matchAll(regexpNames);
  let count = 0
  for (let item of match) {
    if (/.js$/.test(item[1]) || item[1][0] !== ".") {
      continue
    }
    let temp = item[0]
    let index = item.index + count
    let now = temp.replace(item[1], `${item[1] + (markIndexImportSet.has(item[1]) ? "/index" : "")
      }.js`)
    let past = personList.slice(0, index)
    let feature = personList.slice(index + temp.length, personList.length)
    personList = `${past}${now}${feature}`
    count = count + 3
  }

  await fs.writeFile(pat, personList, { encoding: "utf8" })
}

function markIndexImport(pat, name) {
  if (name === "index.js") {
    pat = pat.replaceAll("\\", "/")
    markIndexImportSet.add("./" + pat.substring(pat.indexOf("dist") + 5))
  }
  return true
}

void async function () {
  await BFS("dist", markIndexImport)
  await BFS("dist", () => true, handleFile)
}()
