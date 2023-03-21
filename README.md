# MonsterSirenApi

塞壬唱片后台 Nodejs API

因为接口不是很多，就算是个小玩具来玩，也可以将其作为一些作业的后台使用

- [接口一览](https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E6%8E%A5%E5%8F%A3%E4%B8%80%E8%A7%88.md)
- [已有专辑ID一览](https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E5%B7%B2%E6%9C%89%E4%B8%93%E8%BE%91ID%E4%B8%80%E8%A7%88.md)
- [已有歌曲ID一览](https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E5%B7%B2%E6%9C%89%E6%AD%8C%E6%9B%B2ID%E4%B8%80%E8%A7%88.md)

灵感与部分源码来源：

https://github.com/Binaryify/NeteaseCloudMusicApi

## 版本要求

node v16.15.0 及以上

## 作为 Nodejs 服务器使用（推荐）

### 克隆仓库到本地

```bash
git clone https://github.com/QingXia-Ela/MonsterSirenApi.git
cd MonsterSirenApi
pnpm i
```

### 启动服务器

```bash
npm start
```

## npm 包调用独立 api

### 下载包

```bash
npm i monster-siren-api
```

### api 直接调用

#### 使用方法

```js
import { albums, album_$id_data } from 'monster-siren-api'

// 直接使用，不需要参数
albums().then(({data}) => {
  console.log(data)
})

// 搭配参数使用，具体请参考接口一览文档，也可以通过 ts 声明查看
album_$id_data({ id: 6667 }).then(({data}) => {
  console.log(data)
})
```

#### api 引入参数说明

每个 api 均有对应的 ts 声明，也可以查看 [接口一览](https://github.com/QingXia-Ela/MonsterSirenApi/blob/main/docs/dev/%E6%8E%A5%E5%8F%A3%E4%B8%80%E8%A7%88.md) 进行查询

目前所有接口都是 get 请求，只有还没有做的登录接口会有 post 与 options

假设我们要引入查询专辑数据的 api，他的路径是这样的：`/album/:id/data`，其中包含 `id` params。我们只需要将 `/` 替换为 `_`、`:` 替换为 `$` 即为 api 的别名

如果你觉得这样子引入很难受，那么可以通过 `as` 关键字改名字：`import { album_$id_data as aid } from 'monster-siren-api`

#### 非 Nodejs 使用时的额外注意事项

注意！虽然这些可以在浏览器中引入，但是其本质是直接发起请求，没有处理跨域，所以浏览器不能直接使用；如果使用 electron 或 tauri 等可以通过重写请求方法来处理跨域：

```js
// api
import { search } from 'monster-siren-api/api'
// tauri 可跨域 fetch
import { fetch } from '@tauri-apps/api/http'

// 发起请求时重写请求方法
search({
  request: async (method, url) => {
    return await fetch(url, { method })
  }
})
// 照常接收数据
.then(({ data }) => { })
```

### 引入服务器实例

**注意！只支持Nodejs！**

```js
import server from 'monster-siren-api'

server({
  // 可自定义端口号
  port: 3000
}).then((e) => {
  // 返回 express 服务器实例
  console.log(e)
})
```

## 开发指南

Nodejs 需要支持 `--experimental-specifier-resolution=node` 实验性特色功能，因为开发过程中没有为 ts 文件添加扩展名，ts 实时编译也不会携带扩展名

### 自行扩展其他接口（暂不推荐）

由于当初架构设计不合理等一系列原因，扩展接口变成了一件比较麻烦的事情，具体体现在接收的参数需要在扩展接口内自行解构，然后并放置到 `body, params` 等对应位置

可以看源码是怎么处理那堆屎山的，如果有更好的想法本人十分甚至九分欢迎 PR ！
