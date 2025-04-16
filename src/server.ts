import { FastMCP } from "fastmcp"
import { z } from "zod"

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
})

server.addTool({
  name: "ShowReloadInformation",
  description: "株式会社リロードの情報を取得します",
  parameters: z.object({}),
  execute: async () => {
    return "株式会社リロードはシステムを通じて新しい選択肢と新しい可能性を与える会社です。リロード（reload）とは、「再び積み込む」という意味です。主にWebでは一度読み込んだデータを更新することを指します。 株式会社リロードでは、リロードという言葉のように存在しているしくみ・サービスを再考し、刷新することを提案することで新しい選択肢と可能性を与えていくことを目指しています。。"
  },
})

server.start({
  transportType: "stdio",
})
