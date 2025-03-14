import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";

// CSV Writer setup
const csvWriter = createObjectCsvWriter({
  path: "results/broken_links.csv",
  header: [
    { id: "url", title: "URL" },
    { id: "status", title: "Status Code" },
    { id: "error", title: "Error Message" },
  ],
});

async function checkLink(
  url: string,
  retries: number = 3
): Promise<{ url: string; status: number | null; error: string | null }> {
  try {
    const response = await axios.get(url, { timeout: 5000 }); // 5s timeout
    return { url, status: response.status, error: null };
  } catch (error: any) {
    if (retries > 0) {
      console.log(`Retrying ${url}... (${3 - retries + 1}/3)`);
      return checkLink(url, retries - 1);
    }
    return { url, status: null, error: error.code || error.message };
  }
}

export async function checkBrokenLinks(links: string[]): Promise<void> {
  console.log("Checking for broken links...");

  const results = await Promise.all(links.map((link) => checkLink(link)));

  const brokenLinks = results.filter((result) => result.status !== 200);

  console.log(`Found ${brokenLinks.length} broken links.`);
  await csvWriter.writeRecords(brokenLinks);
}
