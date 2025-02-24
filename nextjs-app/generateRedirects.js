const fs = require("fs");
const path = require("path");

// Read the next.config.ts file
const nextConfigPath = path.join(__dirname, "next.config.ts");
try {
  const nextConfigContent = fs.readFileSync(nextConfigPath, "utf8");

  // Extract the redirects array
  const redirectsMatch = nextConfigContent.match(
    /async redirects\(\) {\s*return \[([\s\S]*?)\];/
  );
  if (!redirectsMatch) {
    console.error("Could not find redirects in next.config.ts");
    process.exit(1);
  }

  const redirectsString = redirectsMatch[1];
  const redirects = eval(`[${redirectsString}]`);

  // Generate human-readable output
  const humanReadableRedirects = redirects
    .map(redirect => {
      return `Source: ${redirect.source}\nDestination: ${redirect.destination}\nPermanent: ${redirect.permanent}\n\n`;
    })
    .join("");

  // Write to redirects.txt
  const outputPath = path.join(__dirname, "redirects.txt");
  fs.writeFileSync(outputPath, humanReadableRedirects);

  console.log(`Redirects have been written to ${outputPath}`);
} catch (error) {
  console.error(
    "An error occurred while processing the redirects:",
    error.message
  );
  process.exit(1);
}
