import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts"
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Doc, genDocs } from "./doc.ts"
import { serveStatic } from "https://deno.land/x/hono/middleware.ts"

const doc = Doc({
  title: "test",
})

const app = new Hono()

app.get(
  doc("/", "simple test", {
    postParams: {
      name: "string",
    },
  }),
  (c) => c.text("Hello World!"),
)

app.get(
  doc("/abc", "", {
    postParams: {
      name: "string",
    },
  }),
  (c) => c.text("Hello Deno!"),
)

app.get(
  doc("/xyz", "", {
    getParams: {
      name: "string",
    },
  }),
  (c) => c.text("Hello Deno!"),
)

app.use("/docs", serveStatic({ path: "./docs.html" }))

await genDocs("./newdocs.html")

serve(app.fetch)
