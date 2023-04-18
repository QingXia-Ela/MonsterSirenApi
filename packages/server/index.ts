import express from "express";
import parseModule from "./parseModule";
import request from "../utils/request";
import chalk from "chalk";
import getCurrentTime from "../utils/getCurrentTime";
import judgeCorrectPath from "../utils/judgeCorrectPath";
import { AxiosResponse } from "axios";

export interface ServerOptions {
  /** 服务器端口 */
  port?: number
}

const CacheMap = new Map<string, AxiosResponse>()

function regRoute(app: express.Express) {
  const modules = parseModule()

  for (const { route, handler } of modules) {
    app.use(route, async ({ query, params, body, originalUrl }, res, next) => {
      if (!judgeCorrectPath(route, originalUrl)) {
        next()
        return
      }

      try {
        const hasCache = CacheMap.has(originalUrl)
        const response = hasCache ? CacheMap.get(originalUrl) as AxiosResponse : await handler({
          ...query,
          ...params,
          ...body,
          request: (method, url, config = {}) => {
            return request({
              method,
              url,
              ...config
            })
          }
        })

        console.log(`${chalk.green(`[200 OK${hasCache ? " Cache Used" : ""}] [${getCurrentTime()}]`)} ${decodeURI(originalUrl)}`);

        if (!hasCache) {
          // @ts-expect-error: ignore axios response
          CacheMap.set(originalUrl, response)

          setTimeout(() => {
            CacheMap.delete(originalUrl)
          }, 60000);
        }

        res.send(response)
        return
      } catch (e: any) {
        console.log(`${chalk.red(`[${e.code ?? "400"} ERROR] [${getCurrentTime()}]`)} ${decodeURI(originalUrl)}`);
        res.statusCode = 400
        res.send(e.toString())
      }
    })
  }
}

function createServer() {
  const app = express()

  const CORS_ALLOW_ORIGIN = false

  /**
   * CORS & Preflight request
  */
  app.use((req, res, next) => {
    if (req.path !== "/" && !req.path.includes(".")) {
      res.set({
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin":
          CORS_ALLOW_ORIGIN || req.headers.origin || "*",
        "Access-Control-Allow-Headers": "X-Requested-With,Content-Type,User-Agent",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "Content-Type": "application/json; charset=utf-8",
      })
    }
    req.method === "OPTIONS" ? res.status(204).end() : next()
  })

  /**
   * reg module
   */
  regRoute(app)

  return app
}

export default function (options: ServerOptions = {}) {
  return new Promise<express.Express>((res, rej) => {
    try {
      const port = Number(options.port || process.env.PORT || "3000")

      const server = createServer()

      server.listen(port, () => {
        console.log(`server running @ http://localhost:${port}`)
        res(server)
      })
    } catch (e) {
      rej(e)
    }
  })
}
