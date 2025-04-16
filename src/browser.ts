import puppeteer, { Browser, Page } from "puppeteer"

export const newBrowser: () => Promise<Browser> = async () => {
  return await puppeteer.launch({
    headless: true,
    slowMo: 10,
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
      "--disable-features=site-per-process",
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--lang=ja",
    ],
    timeout: 90_000,
    protocolTimeout: 60_000,
  })
}

export const goto = async ({
  url,
  timeout,
}: {
  url: string
  timeout?: number
}): Promise<Page | undefined> => {
  const page = await newPage()
  page.setCacheEnabled(true)
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: timeout ?? 60_000,
  })
  if ((response?.status() ?? 200) > 399) return
  const contentType = response?.headers()["content-type"]
  if (!contentType?.includes("text/html")) return
  return page
}

export const newPage = async () => {
  const page = await (await newBrowser()).newPage()
  page.setExtraHTTPHeaders({
    "Accept-Language": "ja-JP",
  })
  return page
}
