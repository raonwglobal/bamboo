# BambooAsia

Vietnam bamboo-based **circular materials** platform for architecture, wellness, and tropical R&D.

**Live target:** Cloudflare Pages  
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
| `index.html` (and other site assets) | **Project code** — the BambooAsia website |
| `.agents/`, `AGENTS.md`, `luna-chat-coder` | **Not project code** — optional auxiliary tooling for chat-based development only |

The `luna-chat-coder` skill under `.agents/skills/` is a **development aid only**. It must not influence product behavior, branding, or deployment. **No content from `luna-chat-coder` belongs in the shipped website or production configuration.**

When cloning for production or Cloudflare deploys, treat only the site files as the product.

---

## Tech stack

- Single-page app delivered as static HTML
- React (production bundle embedded in the page)
- Tailwind CSS (inlined)
- Google Fonts: Inter + Fraunces
- No Node build step required for Cloudflare Pages static hosting

Primary deliverable:

```text
index.html   ← production entry (Cloudflare Pages root)
```

Legacy filename in history: `Bambooasia (1).html` — do not deploy that name; use `index.html`.

---

## Cloudflare Pages deployment

### Recommended setup

1. **Connect** this GitHub repository to [Cloudflare Pages](https://pages.cloudflare.com/).
2. **Build settings**
   - Framework preset: **None** (static)
   - Build command: *(leave empty)*
   - Build output directory: `/` (repository root)
3. **Root document:** `index.html` must exist at the repository root.
4. Optional: attach a custom domain (e.g. `bambooasia.vn`) in the Pages project settings and enable HTTPS.

### Local preview with Wrangler

```bash
# Install once
npm i -g wrangler

# Preview the static site (requires index.html at root)
npx wrangler pages dev .
```

Or deploy from CI / local:

```bash
npx wrangler pages deploy . --project-name=bambooasia
```

`wrangler.toml` in this repo documents the Pages project name and compatibility notes.

### Production checklist

- [x] Entry file is `index.html` (not a spaced / numbered export name)
- [x] `<title>` and meta description set for BambooAsia
- [ ] Custom domain + DNS (Cloudflare)
- [ ] Optional `_headers` / caching rules for static assets
- [ ] Confirm no agent-only files are required at runtime (they are not)

### Known static-hosting notes

- The page is a client-rendered React artifact. There is no server-side routing; a single `index.html` is sufficient.
- External font CSS is loaded from Google Fonts; ensure the deployment network allows that origin, or self-host fonts later if policy requires.
- File size is large (~2.6 MB) because styles and React runtime are inlined. Acceptable for Pages; consider code-splitting only if you later move to a multi-file build.

---

## Repository layout (product-relevant)

```text
.
├── index.html          # BambooAsia site (production entry)
├── README.md           # This file
├── LICENSE
├── wrangler.toml       # Cloudflare Pages hints
└── .gitignore
```

Agent / recovery paths (`.agents/`, `AGENTS.md`, `.restore/`) may exist in the Git history for developer convenience. They are **out of scope** for the product and for Cloudflare runtime.

---

## License

MIT — see [LICENSE](./LICENSE).

Product brand and content (BambooAsia, copy, contact details) remain the property of their respective owners; the MIT license applies to the repository’s software packaging as published.
