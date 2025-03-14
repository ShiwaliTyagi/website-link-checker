# Website Link Checker

This project is a tool to crawl a website, extract all the links, and check whether any of the links are broken. The broken links are saved in a CSV file.

## Features

- Crawls a website (currently Flipkart) to extract all links.
- Checks each link for availability by sending HTTP requests.
- Retries failed requests up to 3 times.
- Saves broken links with status codes and error messages in a CSV file.

## Requirements

- Node.js (v16 or higher)
- npm (or yarn)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShiwaliTyagi/website-link-checker.git
   ```
2. Navigate to the project directory

   ```bash
   cd website-link-checker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the script
   ```bash
   npx ts-node src/index.ts
   ```
