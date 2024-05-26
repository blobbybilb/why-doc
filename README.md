Archived, not general enough >:)

---

# why?doc

A simple API docs generator for simple APIs.

## Usage (example with [Hono](https://hono.dev))

Import:
```ts
import {
  genDocs,
  WhyDoc,
} from "https://raw.githubusercontent.com/blobbybilb/why-doc/main/doc.ts"
```

Initialize:
```ts
const doc = WhyDoc({
  title: "Test API Docs",
  basePath: "/api", // optional
})
```

Then, instead of:
```ts
app.get(
  "/test",
  (c) => c.text("test"),
)
```

Do:
```ts
app.get(
  doc("/test", "a simple test"), // returns the path to avoid repeating it
  (c) => c.text("test"),
)
```

Add GET and POST Parameters:
```ts
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
```

Finally, generate the docs:
```ts
genDocs() // optionally, pass in a string path to a different output file
app.use("/docs", serveStatic({ path: "./docs.html" })) // serve the static html file however you want
```

And get something like:

<img width="400" alt="Screenshot 2023-06-08 at 2 20 44 PM" src="https://github.com/blobbybilb/why-doc/assets/58201828/f9cc1ff7-55be-443f-ada4-63d498cba145">


## License

GNU LGPLv3
