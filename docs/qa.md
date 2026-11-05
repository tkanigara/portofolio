# Acceptance and visual QA — 5 November 2026

## Verified result

Static Astro build: **10 HTML pages**, nine indexable URLs, robots and generated sitemap. All three resumes available. No production deployment, domain change, remote push, or main-branch change was performed.

| Check | Result |
|---|---|
| `npm run lint` | PASS — Prettier across source, scripts, tests and config |
| `npm run check` | PASS — 23 files, 0 errors, 0 warnings, 0 hints |
| `npm run build` | PASS — static output, approximately 1.2 MB including PDFs, responsive derivatives and social image |
| `npm test` | PASS — 10 HTML routes, 239 local references, 9 image occurrences, unique titles/descriptions/canonicals, anchor IDs, sitemap/robots |
| Resume integrity | PASS — all 3 public PDFs have identical SHA-256 to source PDFs |
| `npm run test:browser` | PASS — 19 tests including motion follow-up, 0 skipped/flaky/failures, approximately 2.2 minutes |
| Dependency security | PASS — `npm audit`: 0 vulnerabilities including dev dependencies |
| anti-ai-slop source and built HTML scan | 0.0/10 heuristic risk; reviewed manually as described below |

The host Node 20 was not changed globally. Node 24.22.2 LTS was downloaded to ignored `.tools/` and its SHA-256 verified against nodejs.org SHASUMS256.txt. Runtime dependency is Astro **7.4.5**. Dev dependencies are exact-pinned in package.json/lockfile. Lighthouse 13.6.0 initially introduced moderate transitive advisories; it was replaced with **13.5.0**, after which the full audit was clean.

## Browser coverage

Google Chrome through Playwright on Windows. Viewports: **375, 768, 1280, 1440px**, light and dark (eight contexts). Ten routes visited per context: home, project index, six case studies, resume, and explicit 404 page. Checks include HTTP response, heading, loaded images including lazy media, no horizontal overflow, correct theme, and no JavaScript/console errors.

Five pages per context also ran axe WCAG A/AA checks: home, project index, MAI, Nimonspedia and resume — **40 accessibility scans**, no reported violations. The same pages produced **40 full-page screenshots**, plus one mobile-menu screenshot. Automated audits complement, rather than replace, keyboard and visual review.

Interactions verified separately:

- Theme toggle changes palette and persists across reload; initial theme follows OS and OS changes until explicitly overridden.
- Skip link moves keyboard focus into main.
- Mobile menu exposes links, sets aria-expanded, focuses the first link, closes on Escape with focus restoration, and closes after anchor navigation.
- Web/AI/Systems filters, text search, combination filtering, and empty state behave correctly.
- Three PDF view links return actual PDF bytes; download produces a descriptive Fullstack filename.
- All six projects and main navigation remain available with JavaScript disabled on a 375px viewport.
- Case study anchors, local links, public images, and source routes resolve.
- An unknown path returns HTTP 404 and the authored “unwritten” page, rather than a host error screen.

## Visual review and revisions

Inspected actual full-page captures and viewport/crop comparison sheets. Reviewed hero, portrait crop, selected work, experience, expertise, leadership, footer, project index, MAI/Nimonspedia case studies, resume resources, and mobile menu in both themes across the four widths.

Revisions made from observed issues:

1. Removed reduced opacity from small MAI stage numbers to resolve an axe contrast failure.
2. Corrected 404 canonical to the actual emitted `404.html` URL.
3. Adjusted the browser test to scroll lazy images into view before asserting load; the initial failure was a premature test assertion, not a missing published asset.
4. Replaced misleading diagram-wide link names with ordinary labeled diagrams; project headings and case-study CTAs remain links. Included visible T.K text in brand accessible names. Lighthouse’s label-content-name audit now passes.
5. Made MAI’s conceptual visual use the designed dark palette instead of keeping a bright light surface in dark mode.
6. Added 800px screenshot derivatives and corrected the Little Alchemy maximum srcset width to match its actual 1440px source.
7. Switched the supporting Little Alchemy image to contain its full interface rather than cropping its controls.
8. Bundled real WOFF2 fonts through Vite for fingerprinting and base-path resilience; preload uses the same emitted DM Sans URL. No third-party font request.

No clipped headings, broken mobile columns, horizontal scroll, missing images, ghost sections, or low-contrast text remained in the inspected output. Small labels inside diagrams remain secondary annotations; body copy and controls retain readable sizes. Nimonspedia screenshots are preserved rather than cosmetically reconstructed.

Local evidence (ignored, not deployed):

```text
.local-backup/qa/screenshots/{home,projects,projects-mai-analytics,projects-nimonspedia,resume}-{width}-{theme}.png
.local-backup/qa/screenshots/mobile-menu.png
.local-backup/qa/playwright-results.json
.local-backup/qa/lighthouse-home-final.json
.local-backup/qa/lighthouse-resume.json
.local-backup/qa/lighthouse-nimonspedia.json
```

## Lighthouse mobile

Measured against the production build served by `astro preview`, using Lighthouse **13.5.0**, Chrome headless, default mobile simulation. These are local lab measurements, not field data or a deployed-site guarantee.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | **99** | **100** | **100** | **100** |
| Resume | **99** | **100** | **100** | **100** |
| Nimonspedia case study | **98** | **100** | **100** | **100** |

Initial rebuild home LCP: approximately **2.11s**, CLS **0**. Main optimizations: static HTML, no framework hydration, small native application scripts, self-hosted fonts, small WebP portrait, responsive screenshots, eager hero portrait and lazy below-fold media. Some font/CSS request chains and image-delivery suggestions remain; the primary scores exceed the requested target. No numerical project benchmark was inferred from these site measurements. The post-motion measurement is recorded below.

Reproduction (after starting `npm run preview`; Chrome path may vary):

```powershell
node node_modules/lighthouse/cli/index.js http://127.0.0.1:4321/ --chrome-path='C:/Program Files/Google/Chrome/Application/chrome.exe' --chrome-flags='--headless=new' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=.local-backup/qa/lighthouse-home-final.json --quiet
```

## Anti-slop review using upstream rubrics

Diagnosis: a restrained engineer’s portfolio with genuine evidence and a consistent typographic system. It does not rely on a SaaS component library, gradients, generic icon cards, artificial metrics, or decorative animation. The remaining familiar pattern is the editorial two-column introduction; it is adapted with the real portrait, project-weight changes and technical diagrams.

| AI Slop category | Score / 2 | Reason |
|---|---:|---|
| Palette defaultness | 0 | Deliberate paper/forest system with designed dark counterpart |
| Layout defaultness | 1 | Familiar portfolio split, varied and purposefully paced project composition |
| Component defaultness | 0 | Custom editorial rows and case studies; no UI kit defaults |
| Typography genericness | 0 | Intentional sans/italic serif/mono roles and responsive hierarchy |
| Decorative noise | 0 | Four selective reveals and finite explanatory traces; no glows, gradients, cursor, counters, or excessive motion |
| **AI Slop Score** | **1 / 10** | Subjective rubric assessment |

| Distinctiveness category | Score / 2 |
|---|---:|
| Product fit | 2 |
| Visual system clarity | 2 |
| Layout character | 1 |
| Typographic identity | 2 |
| Signature moments | 1 |
| **Distinctiveness Score** | **8 / 10** |

Implementation Readiness before UI: **10/10** — audience/action, constrained direction, tokens, layout strategy and quality gate were specified. Scanner output is 0/10 heuristic risk; its generic recommendations are printed unconditionally and are not evidence of issues. The scanner does not directly parse `.astro`, so compiled HTML was also scanned. Scores are heuristics, not proof of design quality or a substitute for the inspected screenshots.

## Remaining limits and handoff

- No Vercel credentials or linked project configuration found; no preview URL exists. README gives executable preview commands for the existing project. Production is explicitly gated on owner approval.
- Nimonspedia source URL returns 404; screenshots and owner-approved content are complete, and no dead GitHub action is shown.
- MAI dates differ across original PDFs. Website uses 2026; PDFs are unmodified. Owner can reconcile dates during the next CV update.
- Little Alchemy frontend and controls were inspected. Search backend availability and every algorithm endpoint were not independently certified; the site does not claim a successful live search result.
- Luma is an educational project with a stale README milestone label; no fabricated completeness or benchmark claim.
- CV ATS preview is withheld because it contains candidate information. Only the conceptual flow ships.
- No Safari/Firefox runs, full screen-reader session, remote deployment test, or hosted field-performance data. Reduced-motion and no-JavaScript behavior were tested in Chrome.

These limits do not block the completed local static website. Further publication and production-domain changes remain separate owner-controlled steps.

## Motion follow-up

Owner approved a restrained animation pass. Native Web Animations adds four hero elements (400ms, 10px, short stagger), four one-time Work/Experience reveals (360ms, 12px), and finite MAI / FFNN traces. MAI follows its five conceptual stages; FFNN highlights forward connections then reverses for backpropagation. CTA arrows and the mobile menu respond in 160–180ms. No added dependency, perpetual animation, image zoom, or motion on every project card.

Diagram replay is available through keyboard buttons and fine-pointer hover. Reduced-motion skips these effects, cancels active animations when the preference changes, hides trace-only controls, and retains the full static diagrams. Content is never hidden by reveal CSS; no-JavaScript navigation/content checks still pass. Native interaction scripts total approximately 4.2 KB uncompressed on home.

Validation: 19 Playwright tests pass, including eight normal-motion viewport/theme contexts, keyboard replay, one-time reveal behavior, and dynamic reduced-motion cancellation. Eight additional axe scans with WCAG 2.1 A/AA tags report no violations. Existing reduced-motion route/PDF/menu/filter tests also pass. Actual screenshots include the four widths in both themes, hero entrance and diagram frames; visual review found no overflow or obscured content. Evidence and a short WebM capture are in `.local-backup/qa/motion/`.

An existing development server occupied port 4321. Final acceptance used the independently started production preview on 4322 with `PORTFOLIO_PREVIEW_URL`, leaving the development server untouched. Preview URL can now be overridden in the test config. The initial development-server measurement was discarded and replaced with a production-preview measurement after test workers finished.

Post-motion Lighthouse mobile on the production preview: **Performance 98, Accessibility 100, Best Practices 100, SEO 100**; LCP approximately **2.19s**, CLS **0**, console audit passed. Raw report: `.local-backup/qa/lighthouse-motion.json`. The short actual browser recording is `.local-backup/qa/motion/preview.webm`.

Anti-slop review remains 1/10 and distinctiveness 8/10 (subjective rubric): motion reinforces entrance hierarchy and explains the two diagrams; it is finite, selective, keyboard-operable and reduced-motion safe. Source scan remains 0/10 heuristic risk.
