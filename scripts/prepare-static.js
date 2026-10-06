/**
 * Cloudflare Pages / local static prepare step.
 * This project is a pre-built static HTML site (no React build pipeline).
 * Ensures index.html exists at repo root for Pages to serve.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const legacyPath = path.join(root, "Bambooasia (1).html");

function log(msg) {
  console.log(`[bambooasia build] ${msg}`);
}

if (fs.existsSync(indexPath)) {
  log("index.html already present — static site ready.");
  process.exit(0);
}

if (fs.existsSync(legacyPath)) {
  log("index.html missing — copying from legacy 'Bambooasia (1).html'.");
  let html = fs.readFileSync(legacyPath, "utf8");
  // Production title / meta if still the artifact defaults
  if (html.includes("<title>React Artifact</title>")) {
    html = html.replace(
      "<title>React Artifact</title>",
      "<title>BambooAsia — Vietnam Bamboo Circular Materials</title>"
    );
  }
  if (!html.includes('name="description"')) {
    html = html.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="BambooAsia — Vietnam bamboo-based circular material platform for architecture, wellness, and tropical R&D.">\n  <meta name="theme-color" content="#2D5016">'
    );
  }
  fs.writeFileSync(indexPath, html, "utf8");
  log("Wrote index.html from legacy export.");
  process.exit(0);
}

console.error(
  "[bambooasia build] ERROR: Neither index.html nor 'Bambooasia (1).html' found."
);
process.exit(1);
