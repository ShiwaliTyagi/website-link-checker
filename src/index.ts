import { crawlWebsite } from "./crawler";
import { checkBrokenLinks } from "./checker";
import fs from "fs";
import path from "path";

const FLIPKART_URL = "https://www.flipkart.com/";
const RESULTS_DIR = path.join(__dirname, "../results");
const LINKS_FILE = path.join(RESULTS_DIR, "links.txt");

async function main() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }

  console.log(`Starting crawl for: ${FLIPKART_URL}`);
  const links = await crawlWebsite(FLIPKART_URL);

  fs.writeFileSync(LINKS_FILE, links.join("\n"), "utf-8");
  console.log(`Links saved to ${LINKS_FILE}`);

  console.log("Checking for broken links...");
  await checkBrokenLinks(links);
}

main().catch(console.error);
