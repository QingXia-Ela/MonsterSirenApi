import { describe } from "node:test"

declare module "process" {
  export default process
}

declare function describe(): typeof describe