import * as AllModules from "../modules/AllModules"
import { SingleModule } from "../declare/modules"
import isValidKey from "../utils/isValidKey"


export default function (modules?: SingleModule[]) {
  const res: SingleModule[] = [], FinalModules = modules ?? AllModules

  for (const i in FinalModules) {
    if (isValidKey(i, FinalModules)) {
      const route = "/" + (i as string)
        .replaceAll(/\$/g, ":")
        .replaceAll(/_/g, "/")
      const mark = i

      res.push({
        route,
        mark,
        handler: FinalModules[i]
      })
    }
  }

  return res
}