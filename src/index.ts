// Import necessary modules
import { crawlWebsite } from "./crawler"; // Function to crawl the website and fetch links
import { checkBrokenLinks } from "./checker"; // Function to check for broken links
import fs from "fs"; // File system module for file handling
import path from "path"; // Path module for working with file paths

// Constants for the Flipkart website and the results directory
const FLIPKART_URL = "https://www.flipkart.com/";
const RESULTS_DIR = path.join(__dirname, "../results"); // Directory to store results
const LINKS_FILE = path.join(RESULTS_DIR, "links.txt"); // Path to save crawled links

// Main function that coordinates the crawling and checking of broken links
async function main() {
  // Check if the results directory exists, if not, create it
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }

  // Start crawling the website to fetch links
  console.log(`Starting crawl for: ${FLIPKART_URL}`);
  const links = await crawlWebsite(FLIPKART_URL);

  // Save the crawled links to a file
  fs.writeFileSync(LINKS_FILE, links.join("\n"), "utf-8");
  console.log(`Links saved to ${LINKS_FILE}`);

  // Start checking the crawled links for broken ones
  console.log("Checking for broken links...");
  await checkBrokenLinks(links);
}

// Run the main function and catch any errors
main().catch(console.error);
