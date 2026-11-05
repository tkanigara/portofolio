# Portfolio rebuild — decision log

## Baseline, 5 November 2026

- Original branch: `main`; origin: `https://github.com/tkanigara/portofolio.git`.
- Tracked files had no modifications. Owner-provided AGENTS/DESIGN/CONTENT/PROMPT, CV directory and instruction ZIP were untracked and preserved.
- Work branch: `redesign/portfolio-2026`. Full original snapshot: `.local-backup/original-2026-11-05.zip` (ignored, local only). Original portrait and favicon sources remain at root.
- No Vercel project configuration or credentials were present in the checkout. No production action authorized.
- Old page: monolithic HTML, disabled experience section, third-year copy, subjective proficiency percentages, GitHub ZIP actions, 512×512 favicon incorrectly advertised as a 1200×630 OG image, placeholder sitemap domain.

## Design brief (before implementation)

Type: complete portfolio redesign. Audience: engineering recruiters and collaborators. Primary action: inspect real work; secondary: choose a resume and contact Timur. Within five seconds: software engineer, web + applied AI, real person and evidence.

Direction: **Minimal Editorial Product**, adapted as an engineer's field notes. Warm paper/ink, forest accent, asymmetric editorial split, numbered chapters and quiet rules. The genuine warm portrait provides the human color; actual product screenshots provide evidence. No decorative generated images.

Typography: self-hosted DM Sans for clear interfaces and large tightly tracked headings; Newsreader italic only for short editorial emphasis; small DM Mono labels connect the publication-like composition to engineering context. 16–18px body, 48–88px display, 65–76ch reading column.

Tokens: light background #FAF9F6, ink #202522, muted #626B65, accent #24776A, border #DADFD8; dark background #151917, text #F0F1ED, muted #AFB9B1, accent #86C9B6, border #37413B. Spacing 4/8/12/16/24/32/48/64/96px; max width 1240px; gutters 20–48px. Corners 0–4px. No shadows. Local SVG arrows and theme glyph. Motion limited to 160ms color/underline feedback; reduced motion respected.

Layout: offset portrait alongside a left-aligned introduction; MAI wide narrative + conceptual workflow, Nimonspedia large actual screenshot, FFNN quieter network illustration, Little Alchemy horizontal supporting story. Experience is a typographic ledger; expertise is a row matrix; leadership is a compact chronology. Resume resources are document rows, not pricing cards. Each case study uses typed, project-specific sections and evidence.

Accessibility: progressive HTML first, visible focus, skip link, native buttons, mobile disclosure with Escape and focus restoration, 44px controls, OS theme on first load and persisted explicit override. No scroll reveals or content gated by JavaScript.

## Source decisions

- All three PDFs validated with pypdf. Public email is **timurkanigara21@gmail.com** in all three; old site email is obsolete.
- MAI date conflict: AI PDF May–Nov 2026; FE/Fullstack May–Present. Site uses **2026**, without asserting ongoing employment or a precise end date. PDFs are served unchanged.
- Fourth-year ITB status verified in PDFs. Graduation month, GPA and phone omitted from page copy.
- Nimonspedia repo 404; use owner-approved CONTENT.md description and original Drive screenshots. No dead GitHub action.
- FFNN, Little Alchemy, CV ATS and Luma_OSjang are public collaborative forks; link owner's fork as source, acknowledge collaboration. No internal MAI repository read or link.
- anti-ai-slop-ui: upstream README, SKILL, MIT license and installer reviewed. Python installer copies only project skill files using `--project --targets codex --copy`; installation verified in `.codex/skills/anti-ai-slop-ui`. No global CLI installation. Rubrics/checklists applied.
- Host Node 20 is too old for stable Astro 7.4.5; Node 24.22.2 LTS downloaded locally from nodejs.org with SHA-256 verified against SHASUMS256.txt. No global runtime changed.

QA, provenance and deployment details are recorded in README and docs/qa.md when complete.

## Motion enhancement — owner-approved follow-up

Keep the editorial system. Hero: 400ms entrance, up to 100ms stagger, 10px travel. Four one-time reveals around selected work/experience: 360ms, 12px. CTA/menu feedback: 160–180ms. Use native Web Animations as progressive enhancement; no CSS-hidden content or reveal on every card.

Diagram motion explains sequence: MAI traces onboarding → ingestion → data → KPIs → report; FFNN traces forward connections then backpropagation. Replay buttons and fine-pointer hover run a finite sequence, without loops or fabricated results. Reduced-motion skips entrances/reveals/traces, cancels active effects on preference changes, and retains complete static diagrams. No dependency or production change.

Owner feedback: the first hero entrance was imperceptible. Revised to 520ms per element, 170ms stagger (title → description → actions → portrait), 22px travel, and full fade from zero. A bounded 250ms font-readiness wait prevents the effect finishing during font loading. An early pending class prevents an already-visible hero from fading back out; its independent 1.4s failsafe restores static content if the module fails. No-JavaScript, hash navigation and reduced-motion show static content directly. Existing owner edit to MAI dates is preserved outside this change.
