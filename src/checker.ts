// Import necessary modules
import axios from "axios"; // Axios for making HTTP requests
import { createObjectCsvWriter } from "csv-writer"; // CSV writer for outputting results

// Setup CSV writer to save broken links
const csvWriter = createObjectCsvWriter({
  path: "results/broken_links.csv", // File path to save broken links
  header: [
    // CSV headers for the broken links
    { id: "url", title: "URL" },
    { id: "status", title: "Status Code" },
    { id: "error", title: "Error Message" },
  ],
});

// Helper function to check if a link is broken, with retries
async function checkLink(
  url: string,
  retries: number = 3
): Promise<{ url: string; status: number | null; error: string | null }> {
  try {
    // Send an HTTP GET request to the URL with a timeout of 5 seconds
    const response = await axios.get(url, { timeout: 5000 });
    return { url, status: response.status, error: null }; // Return status if successful
  } catch (error: any) {
    // If the request fails, retry up to 3 times
    if (retries > 0) {
      console.log(`Retrying ${url}... (${3 - retries + 1}/3)`);
      return checkLink(url, retries - 1); // Retry logic
    }
    // Return the error if all retries fail
    return { url, status: null, error: error.code || error.message };
  }
}

// Function to check all links and output broken links to a CSV file
export async function checkBrokenLinks(links: string[]): Promise<void> {
  console.log("Checking for broken links...");

  // Check all links in parallel
  const results = await Promise.all(links.map((link) => checkLink(link)));

  // Filter out broken links (those with non-200 status codes)
  const brokenLinks = results.filter((result) => result.status !== 200);

  console.log(`Found ${brokenLinks.length} broken links.`);

  // Write the broken links to a CSV file
  await csvWriter.writeRecords(brokenLinks);
}
