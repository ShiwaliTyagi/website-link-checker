import { chromium } from "playwright";

export async function crawlWebsite(url: string): Promise<string[]> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  console.log(`Crawling: ${url}`);

  // Extract all links using Playwright's locator API
  const links = await page.$$eval("a", (anchors) =>
    anchors
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => !!href && href.startsWith("http"))
  );

  console.log(`Found ${links.length} links.`);
  await browser.close();
  return links;
}
