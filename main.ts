import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts"
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { H } from "https://deno.land/x/hono@v3.2.3/types.ts"

type DocOptions = {}

class HonoDoc extends Hono {
  constructor(
    init: Partial<Pick<Hono, "router" | "getPath"> & { strict: boolean }> = {},
  ) {
    super(init)
  }

  docGet(path: string, docOptions: DocOptions, ...args: H[]) {
    console.log(docOptions)

    return this.get(path, ...args)
  }
}

const app = new HonoDoc()

app.get("/", (c) => c.text("Hello Deno!"))

serve(app.fetch)
