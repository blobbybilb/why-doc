import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts"
import template from "./template.ts"

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
  if (!(Object.keys(docsData).length === 0)) return

  const docs = await eta.render(template, docsData)
  await Deno.writeTextFile(outputPath, docs!)
}

export function Doc(config?: DocConfig) {
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
    docsData[path] = {
      method: (params.postParams ? "POST" : "GET"),
      path: path,
      doctext: doctext,
      getParams: params.getParams ?? {},
      postParams: params.postParams ?? {},
    }

    console.log(docsData)

    console.log(
      path,
      doctext,
      params.getParams,
      params.postParams,
    )
    return path
  }
}
