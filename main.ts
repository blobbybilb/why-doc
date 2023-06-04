import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts"
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

type DocConfig = {
  title: string
  basePath?: string
}

type Params = Record<string, string>

function Doc(config?: DocConfig) {
  if (!config) {
    return (path: string) => path
  }
  return (
    path: string,
    doctext = "",
    params: {
      getParams?: Params
      postParams?: Params
    } = {},
  ) => {
    console.log(path, doctext, params.getParams, params.postParams)
    return path
  }
}

const app = new Hono()
const doc = Doc({
  title: "test",
})

app.get(
  doc("/", "", {
    getParams: {
      name: "string",
    },
  }),
  (c) => c.text("Hello Deno!"),
)

serve(app.fetch)
