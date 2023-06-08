import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts"
import template from "./template.ts"

let title: string

const docsData: Record<
  string,
  {
    method: string
    path: string
    doctext: string
    getParams: Params
    postParams: Params
  }
> = {}

type DocConfig = {
  title: string
  basePath?: string
}

type Params = Record<string, string>

export async function genDocs(outputPath = "./docs.html") {
  if (Object.keys(docsData).length === 0) return
  if (!title) {
    throw new Error("Title not set. Did you forget to call Doc() first?")
  }

  const docs = await eta.render(template, { title, docsData })
  await Deno.writeTextFile(outputPath, docs!)
}

export function Doc(config?: DocConfig) {
  if (!config) {
    return (path: string) => path
  }
  title = config.title
  return (
    path: string,
    doctext = "",
    params: {
      getParams?: Params
      postParams?: Params
    } = {},
  ) => {
    docsData[(config.basePath ?? "") + path] = {
      method: (params.postParams ? "POST" : "GET"),
      path: (config.basePath ?? "") + path,
      doctext: doctext,
      getParams: params.getParams ?? {},
      postParams: params.postParams ?? {},
    }
    return (config.basePath ?? "") + path
  }
}
