# BambooAsia

Vietnam bamboo-based **circular materials** platform for architecture, wellness, and tropical R&D.

**Live target:** Cloudflare  
**Repository:** https://github.com/raonwglobal/bamboo

---

## What this project is

BambooAsia is a product and brand site for a Vietnam-based circular economy supply chain built around bamboo:

| Area | Offerings |
|------|-----------|
| **Architecture** | Bamboo Timber, Wall Panel, Composite, Deck & Panel Collection |
| **Wellness** | Bamboo Shoot Superfood, Bamboo Cosmetics Base |
| **Platform** | Contract farming · 3-year harvest cycle · thermal treatment / carbonization / fibrillation · modular panel production with high renewable-energy share |

**Contact:** hello@bambooasia.vn  
**Location:** Room 1104 GoldenKing · Ho Chi Minh City · Vietnam

Core messaging:

- Circular Economy based
- Three evolutions of bamboo (structure → surface → applied / edible)
- Sustainable expansion of tropical resources
- Hybrid materials (e.g. coconut coir + bamboo board)

---

## Project code vs agent tooling (important)

| Path | Role |
|------|------|
| Site HTML + `dist/` build output | **Project code** — the BambooAsia website |
| `.agents/`, `AGENTS.md`, `luna-chat-coder` | **Not project code** — optional auxiliary tooling for chat-based development only |

The `luna-chat-coder` skill under `.agents/skills/` is a **development aid only**. It must not influence product behavior, branding, or deployment. **No content from `luna-chat-coder` belongs in the shipped website or production configuration.**

When cloning for production or Cloudflare deploys, treat only the site files as the product.

---

## Tech stack

- Single-page app delivered as static HTML
- React (production bundle embedded in the page)
- Tailwind CSS (inlined)
- Google Fonts: Inter + Fraunces
- Build step only prepares `dist/` (no framework compile)

---

## Cloudflare deployment

This is a **static HTML site**. There is no Worker script entry (`main`). Deployment must either:

- use **Cloudflare Pages** (Git integration uploads the **build output directory**), or  
- use **`wrangler deploy`** with Workers **Static Assets** (`[assets] directory = "./dist"`).

### Why previous deploys failed

| Error | Root cause |
|-------|------------|
| `ENOENT package.json` / `npm run build` | Pages ran `npm run build` but no `package.json` existed |
| `Missing entry-point to Worker script or to assets directory` | `wrangler.toml` used **Pages-only** `pages_build_output_dir`, while the pipeline ran **`wrangler deploy`** (Workers). Workers require `main` **or** `[assets].directory` |

`pages_build_output_dir` and `[assets].directory` are **not interchangeable**. This repo now uses `[assets]` so `wrangler deploy` works.

### A) Cloudflare Pages (Git connected) — recommended

**Settings → Builds & deployments:**

| Field | Value |
|-------|--------|
| Framework preset | **None** |
| Build command | `npm run build` |
| Build output directory | **`dist`** |
| Root directory | `/` (repo root) |

Do **not** set a custom deploy command to `wrangler deploy` unless you intend Workers Static Assets.

After build, Pages uploads `dist/` (contains `index.html`).

### B) Wrangler CLI (Workers Static Assets)

```bash
npm run build          # writes dist/index.html
npx wrangler deploy    # uses [assets] directory = "./dist"
```

Or: `npm run deploy`

For classic Pages CLI upload instead:

```bash
npm run pages:deploy   # wrangler pages deploy dist --project-name=bambooasia
```

### Local preview

```bash
npm run preview
```

### Production checklist

- [x] `npm run build` creates `dist/index.html`
- [x] `wrangler.toml` has `[assets] directory = "./dist"` (fixes missing entry-point)
- [ ] Cloudflare dashboard **Build output directory = `dist`**
- [ ] Custom domain + DNS
- [ ] Agent paths (`.agents`, `luna-chat-coder`) are **not** product code and are not required at runtime

## Repository layout (product-relevant)

```text
.
├── Bambooasia (1).html        # Site source (HTML artifact)
├── package.json               # npm run build → dist/
├── scripts/prepare-static.js  # Copies/normalizes site into dist/
├── wrangler.toml              # [assets] directory = "./dist"
├── _headers / _redirects      # Copied into dist/ at build
├── dist/                      # Build output (generated, gitignored)
├── README.md
├── LICENSE
└── .gitignore
```

Agent paths (`.agents/`, `AGENTS.md`, `luna-chat-coder`, `.restore/`) are **development aids only** — not product code, not required for deploy.

---

## License

MIT — see [LICENSE](./LICENSE).

Product brand and content (BambooAsia, copy, contact details) remain the property of their respective owners; the MIT license applies to the repository’s software packaging as published.
