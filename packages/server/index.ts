import express from "express";

function createServer() {
  const app = express()
  return app
}

export default function (options: Record<string, unknown> = {}) {
  const port = Number(options.port || process.env.PORT || '3000')

  const server = createServer()

  server.listen(port, () => {
    console.log(`server running @ http://localhost:${port}`)
  })
}