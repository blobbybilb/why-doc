# why?doc

A simple API docs generator for simple APIs.

## Usage (example with [Hono](https://hono.dev))

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

<img width="400" alt="Screenshot 2023-06-08 at 1 04 29 PM" src="https://github.com/blobbybilb/why-doc/assets/58201828/6606a584-a816-41e6-954e-18073b5950ae">


## License

GNU LGPLv3