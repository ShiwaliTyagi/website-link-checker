// Import Playwright to control the browser and crawl the website
import { chromium } from "playwright";

// Function to crawl the website and get all HTTP links
export async function crawlWebsite(url: string): Promise<string[]> {
  // Launch a browser instance using Chromium
  const browser = await chromium.launch();
  const page = await browser.newPage(); // Open a new page
  await page.goto(url); // Navigate to the provided URL

  console.log(`Crawling: ${url}`);

  // Extract all 'a' (anchor) tags and filter out those with valid 'href' attributes starting with 'http'
  const links = await page.$$eval(
    "a",
    (anchors) =>
      anchors
        .map((link) => link.getAttribute("href")) // Get the href attribute of each link
        .filter((href): href is string => !!href && href.startsWith("http")) // Filter valid HTTP links
  );

  console.log(`Found ${links.length} links.`);
  await browser.close(); // Close the browser

  return links; // Return the array of links
}
