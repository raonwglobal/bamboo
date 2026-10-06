/**
 * Prepare a clean static output directory for Cloudflare.
 * No framework compile — site is a pre-built HTML artifact.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const SITE_CANDIDATES = [
  path.join(root, "index.html"),
  path.join(root, "Bambooasia (1).html"),
];

const EXTRA_STATIC = ["_headers", "_redirects", "favicon.ico", "robots.txt"];

function log(msg) {
  console.log(`[bambooasia build] ${msg}`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readSiteHtml() {
  for (const candidate of SITE_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      log(`Using site source: ${path.basename(candidate)}`);
      return fs.readFileSync(candidate, "utf8");
    }
  }
  return null;
}

function normalizeHtml(html) {
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
  return html;
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
ensureDir(dist);

const raw = readSiteHtml();
if (!raw) {
  console.error(
    "[bambooasia build] ERROR: No site HTML found (expected index.html or 'Bambooasia (1).html')."
  );
  process.exit(1);
}

const html = normalizeHtml(raw);
fs.writeFileSync(path.join(dist, "index.html"), html, "utf8");
log("Wrote dist/index.html");

for (const name of EXTRA_STATIC) {
  const src = path.join(root, name);
  if (fs.existsSync(src) && fs.statSync(src).isFile()) {
    fs.copyFileSync(src, path.join(dist, name));
    log("Copied " + name);
  }
}

const publicDir = path.join(root, "public");
if (fs.existsSync(publicDir) && fs.statSync(publicDir).isDirectory()) {
  const walk = (from, to) => {
    ensureDir(to);
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const s = path.join(from, entry.name);
      const d = path.join(to, entry.name);
      if (entry.isDirectory()) walk(s, d);
      else fs.copyFileSync(s, d);
    }
  };
  walk(publicDir, dist);
  log("Merged public/ into dist/");
}

log("Static build complete → dist/");
process.exit(0);
