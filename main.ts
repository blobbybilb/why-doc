import { Hono } from "https://deno.land/x/hono@v3.2.5/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { genDocs, WhyDoc } from "./doc.ts"
import {
  genDocs,
  WhyDoc,
} from "https://raw.githubusercontent.com/blobbybilb/why-doc/main/doc.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.2.5/middleware.ts";

const doc = WhyDoc({
  title: "Test API Docs",
  basePath: "/api", // optional
});

const app = new Hono();

app.get(doc("/test", "a simple test"), (c) => c.text("test"));

app.post(
  doc("/abc", "", {
    postParams: {
      name: "string",
    },
  }),
  (c) => c.text("Done!")
);

app.get(
  doc("/xyz", "returns the 'name' GET parameter", {
    getParams: {
      name: "string",
    },
  }),
  (c) => c.text(c.req.query("name")!)
);

genDocs();
app.use("/docs", serveStatic({ path: "./docs.html" }));

app.get("/hi/:some/:thing", (c) => c.text(`Hello, ${c.req.param("key")}`));

serve(app.fetch);
