import { Hono } from "https://deno.land/x/hono@v3.2.5/mod.ts"
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Doc, genDocs } from "./doc.ts"
import { serveStatic } from "https://deno.land/x/hono@v3.2.5/middleware.ts"

const doc = Doc({
  title: "Test API Docs",
  basePath: "/api", // optional
})

const app = new Hono()

app.get(
  doc("/test", "a simple test"),
  (c) => c.text("test"),
)

app.post(
  doc("/abc", "", {
    postParams: {
      name: "string",
    },
  }),
  (c) => c.text("Done!"),
)

app.get(
  doc("/xyz", "returns the 'name' GET parameter", {
    getParams: {
      name: "string",
    },
  }),
  (c) => c.text(c.req.query("name")!),
)

genDocs()
app.use("/docs", serveStatic({ path: "./docs.html" }))

serve(app.fetch)
