import { FastMCP } from "fastmcp"
import { z } from "zod"
import { searchTrackByComposer } from "./jasrac.js"

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
})

server.addTool({
  name: "SearchTrackByComposer",
  description: "作曲者で楽曲を検索する",
  parameters: z.object({
    composer: z.string(),
  }),
  execute: async ({ composer }) => {
    const titleList = await searchTrackByComposer({ composer })
    return titleList?.join("\n") ?? "楽曲が見つかりませんでした"
  },
})

server.start({
  transportType: "stdio",
})
