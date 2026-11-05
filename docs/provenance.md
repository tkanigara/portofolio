# Content and media provenance

Verified 5 November 2026. No employer repository, internal endpoint, client dataset, or internal screenshot was accessed for this rebuild.

## Identity and resumes

The three source PDFs in `CV/` were opened with pypdf and validated as readable PDFs. They consistently give **timurkanigara21@gmail.com** and fourth-year ITB status. The files are copied byte-for-byte to descriptive public filenames at build time, never edited or reconstructed. Phone number and GPA are not repeated in website copy.

The AI resume lists MAI as May–November 2026. FE and Fullstack list May–Present. The website deliberately uses **2026**. The owner should reconcile the PDFs when updating them; no employment end date was invented.

## Original assets

| Asset | Audit | Use |
|---|---|---|
| `photo.jpg` | Genuine portrait, 1366×2048, 1.68 MB | 320/480/720px WebP derivatives; original retained |
| `photo_wa.jpg` | Same portrait, compressed, 1366×2048 | Retained original; higher-quality photo.jpg preferred |
| `favicon.png` | Old gold serif TK, 32×32 | Original retained; deliberately replaced in public/ with new matching PNG |
| `favicon_wa.png` | Gold serif TK, 512×512 | Original retained; not used as a wrongly sized social image |
| `public/favicon.svg` | New code-authored T.K monogram | Primary favicon; PNG and 180px Apple fallback supplied |
| `public/media/social-card.png` | 1200×630 card using genuine portrait and factual text | Open Graph and Twitter image |

## Project media

| Public derivative prefix | Original source | Verification |
|---|---|---|
| `nimonspedia-discovery-*` | [Product Discovery](https://drive.google.com/file/d/1xcDk-qi6rJb4wvz79k3ndCdq-9YCcKvj/view) | Drive metadata confirmed image/png; original 2841×1614 visually inspected |
| `nimonspedia-product-*` | [Product Detail](https://drive.google.com/file/d/1W1OwcYhgFuplShbpE10peUwcLkhUF-Om/view) | Original 2837×1623 visually inspected |
| `nimonspedia-store-*` | [Store Detail](https://drive.google.com/file/d/1IQAFZDHTx6aPajddZtLWhyGVcBEwBCjw/view) | Original 2835×1630 visually inspected |
| `little-alchemy-*` | [Actual live demo](https://tubes2-jumbo-uncut.vercel.app/) | Chrome/Playwright 1440×1000 capture after clicking start and waiting for the recipe form |
| MAI workflow | Owner-approved high-level description + CV | HTML/CSS conceptual diagram, explicitly labeled; no screenshot or internal reconstruction |
| FFNN network | README, `src/ffnn.py`, `src/layer.py` | SVG illustration of configurable dense layers, explicitly conceptual; no fabricated results or claimed fixed architecture |
| CV ATS flow | README and CV | Conceptual PDF → text → KMP/BM → review workflow |
| Luma layers | `indah8` source and CV | Conceptual shell / filesystem / processes / kernel / memory / x86 layers |

Drive originals are temporarily retained in the ignored `.local-backup/media/`. Production uses local WebP copies, never hotlinks. The images retain their original aspect ratios. Browser chrome in the Nimonspedia sources is retained as evidence of the actual local app. Product and store screenshots offer full-resolution links.

CV ATS README preview `1fjUZDczny2EdnuNOgdI82vpFN0_JrKik` was inspected, but candidate information was visible. It is **not included in public/** or the production build. Its conceptual alternative is explicitly described. No synthetic product images were generated.

The Little Alchemy frontend and controls were verified. A successful recipe search is not claimed: the screenshot establishes the interface, not all external backend endpoints. `scripts/capture-demo.mjs` reproduces the capture; its output remains local until reviewed.

## Repository verification

| Repository | Result | Evidence |
|---|---|---|
| [Portfolio](https://github.com/tkanigara/portofolio) | Existing origin, main baseline | Local Git source; baseline `3d2ad8f3f807ea14f7a0bb296dc4013cece52607` |
| Nimonspedia | Supplied URL returns 404 | Owner-approved CONTENT.md and genuine README screenshot manifest used; no dead source link published |
| [FFNN](https://github.com/tkanigara/TubesML_FFNN) | Public collaborative fork | README SHA `da0b303381f05c48586506904fb68baca19d63ff`; model/layer code checked; upstream `fithrarzk/ML-IzinkanKamiMelawanAmerika` |
| [CV ATS](https://github.com/tkanigara/CV_ATS) | Public collaborative fork | README SHA `9e26c667a05dec382de3c28885f66c41a18e8d82`; upstream `hgnhao/Tubes3_SekaratReborn`; algorithm descriptions verified |
| [Little Alchemy](https://github.com/tkanigara/LittleAlchemyRecipe) | Public collaborative fork | README SHA `b6f262dba028cee9bfb3af6e78b5f65426bb887d`; upstream `rakdaf08/Tubes2_JumboUNCUT`; actual demo inspected |
| [Luma_OSjang](https://github.com/tkanigara/Luma_OSjang/tree/indah8) | Public collaborative fork | README SHA `edee557e1544744bf194b14ea707cbe30bad64af`; kernel/paging/process/ext2/shell source checked; upstream `rakdaf08/Luma_OSjang` |

The public account listing was inspected (14 repositories); supporting projects were limited to the strongest verified sources. No MAI source was opened. Luma README has a stale milestone label despite implemented source components; no completeness percentage is repeated. FFNN does not claim RMSNorm. CV ATS is deterministic string matching, not a trained AI model.

## Fonts and skill

- [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans): official variable `DMSans[opsz,wght].ttf`, converted to WOFF2. CSS uses 400–700 weights.
- [Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader): italic 400 from Google Fonts, converted to WOFF2.
- [DM Mono](https://github.com/google/fonts/tree/main/ofl/dmmono): normal 400 from Google Fonts, converted to WOFF2.
- SIL Open Font License files are retained beside each font in `src/assets/fonts/`. Vite emits fingerprinted local URLs and the matching preload. No third-party font request at runtime.
- [anti-ai-slop-ui](https://github.com/rwcod/anti-ai-slop-ui): MIT, v1.0.0. README, SKILL.md, installer behavior and license audited. The dependency-free Python installer was used with `--project --targets codex --copy`, and installation verified. Project copy is ignored; no global tooling changed. Its review rubrics are applied in `docs/qa.md`.

The old apex URL was observed redirecting to `https://www.timurkanigara.my.id/` with successful final response. Canonicals follow **www**. No hosting redirect, DNS, or domain was changed.
