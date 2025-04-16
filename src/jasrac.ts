import { goto } from "./browser.js"

export const searchTrackByComposer = async ({
  composer,
}: {
  composer: string
}) => {
  const page = await goto({
    url: "https://www2.jasrac.or.jp/eJwid/main?trxID=F00100",
  })
  if (!page) return
  await page.type('input[name="IN_KEN_NAME1"]', composer)
  console.log(
    await (
      await page.$$('::-p-xpath(//*[@name="IN_KEN_NAME1"])')
    )[0].evaluate((el) => el.value)
  )
  const btn = await page.$$('::-p-xpath(//*[@name="CMD_SEARCH"])')
  await btn[0].click()
  await page.waitForNavigation()
  const titleList = await page.$$(`::-p-xpath(//td[@data-role="result-title"])`)
  const titleTextList = await Promise.all(
    titleList.map(async (el) => await el.evaluate((el) => el.innerText))
  )
  await page.close()
  return titleTextList
}
