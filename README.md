# Timur Kanigara — editorial portfolio

Portfolio statis **Astro 7.4.5 + TypeScript + custom CSS** untuk Muhammad Timur Kanigara. Copy situs berbahasa Inggris. Branch kerja: `redesign/portfolio-2026`. Produksi, domain, dan `main` belum diubah.

Canonical terverifikasi: **https://www.timurkanigara.my.id/**. Pada audit 5 November 2026, alamat apex mengarah ke www. Konfigurasi hosting tidak diubah.

## Jalankan lokal

Gunakan **Node 24 LTS** (teruji 24.22.2), atau minimum Astro `>=22.23.4`. Versi teruji ada di `.node-version`. Tidak perlu backend, database, token, atau `.env`.

```sh
npm ci
npm run dev
```

Buka URL yang dicetak Astro, biasanya `http://127.0.0.1:4321/`.

```sh
npm run lint
npm run check
npm run build
npm test
npm run preview
```

Jika PowerShell membatasi `.ps1`, gunakan `npm.cmd`. Runtime portabel yang disiapkan di komputer ini tersedia secara lokal (ignored):

```powershell
$env:PATH = "$PWD/.tools/node-v24.22.2-win-x64;" + $env:PATH
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm.cmd run dev
```

## Halaman dan fitur

- `/`: potret asli, empat karya pilihan, pengalaman MAI/ITB, expertise, about, leadership, kontak.
- `/projects/`: enam proyek, pencarian dan filter kategori. Semua proyek tetap tersedia tanpa JavaScript.
- `/projects/mai-analytics/`, `/projects/nimonspedia/`, `/projects/feedforward-neural-network/`, `/projects/little-alchemy/`, `/projects/resume-screening/`, `/projects/luma-osjang/`: case study khusus per proyek, visual faktual, stack, sumber, dan link terverifikasi.
- `/resume/`: view/download untuk AI Engineer, Frontend Engineer, Fullstack / Software Engineer. Fullstack ditonjolkan.
- `404.html`, `/robots.txt`, `/sitemap.xml`: error page dan SEO; sitemap sembilan URL canonical.
- Light/dark mengikuti OS saat kunjungan pertama; pilihan eksplisit disimpan. Skrip head mencegah flash tema.
- Menu mobile dengan state ARIA, Escape dan fokus kembali; skip link, fokus terlihat, reduced-motion, semantic landmarks, image alt.
- Animasi ringan: hero bertahap, empat reveal sekali tampil pada Work/Experience, feedback panah/menu, serta trace workflow MAI dan forward/backward FFNN. Tombol trace dapat dipakai dengan keyboard; hover aktif pada pointer presisi. Tanpa loop atau dependency tambahan. Reduced-motion menampilkan versi statis dan membatalkan efek yang sedang berjalan.
- Metadata unik, canonical, OG/Twitter 1200×630, Person JSON-LD yang faktual.

## Desain dan pemeliharaan

**Minimal Editorial Product**: off-white/ink, aksen hijau, DM Sans + Newsreader italic + DM Mono lokal, tipografi tegas, garis 1px, sudut kecil, ritme asimetris. MAI memakai workflow lebar, Nimonspedia screenshot asli besar, FFNN diagram jaringan, dan Little Alchemy cerita pendukung. Expertise dan resume berupa baris editorial.

Keputusan sebelum implementasi: [docs/implementation.md](docs/implementation.md). Skill [anti-ai-slop-ui](https://github.com/rwcod/anti-ai-slop-ui) berhasil dipasang **lokal untuk Codex** setelah README, SKILL.md, installer dan lisensinya diaudit, memakai Python `--project --targets codex --copy`. Tidak ada instalasi global. Rubrik dan hasil review: [docs/qa.md](docs/qa.md).

```text
src/assets/fonts/        WOFF2 lokal + OFL; dipaketkan Vite
src/components/          Arrow, ProjectMedia, ProjectCard
src/data/                Typed projects, identity, leadership, resume manifest
src/layouts/Layout.astro SEO, navigasi, theme, footer
src/pages/               Semua route + robots/sitemap endpoint
src/styles/global.css    Tokens, layout, typography, responsive rules
src/utils/paths.ts       Prefix BASE_URL untuk tautan/aset publik
public/media/            Optimized WebP asli + social card
public/resumes/          Salinan PDF dari CV/, dibuat ulang saat dev/build
CV/                      Sumber PDF pemilik
scripts/                 Resume sync, media preparation, build verification
tests/                  Browser/axe, fungsi UI, responsive checks
legacy/                  HTML monolit dan sitemap lama sebagai arsip
```

Ubah proyek di `src/data/projects.ts`, identitas/leadership di `src/data/site.ts`, dan desain di CSS tokens. Satu dependency runtime: Astro. Dev dependencies: Astro check/TypeScript, Prettier, Playwright/axe, Lighthouse; semuanya dikunci lockfile. Tanpa React, UI kit, SSR, CMS, analytics, cookies, atau backend.

## Mengganti CV

Letakkan PDF final di `CV/` dengan stem berikut; kapitalisasi, spasi dan separator ditoleransi:

```text
CV-Muhammad Timur Kanigara-AI.pdf
CV-Muhammad Timur Kanigara-FE.pdf
CV-Muhammad Timur Kanigara-Fullstack.pdf
```

Dev/build memeriksa signature PDF, menolak nama ambigu, lalu menyalin byte asli ke `public/resumes/Muhammad-Timur-Kanigara-{AI|FE|Fullstack}.pdf` serta membuat manifest. Jika file hilang, UI menampilkan unavailable tanpa broken download. Jalankan ulang dev/build setelah mengganti PDF. Resume tidak ditulis ulang.

Email pada ketiga PDF: **timurkanigara21@gmail.com**. Tanggal MAI berbeda (AI: May–Nov 2026; FE/Fullstack: May–Present); situs memakai **2026**. Selaraskan PDF pada pembaruan berikutnya.

## Aset dan bukti

Tautan sumber, dimensi, SHA README, dan keputusan privasi: [docs/provenance.md](docs/provenance.md).

- `photo.jpg` asli tetap di root; WebP 320/480/720px dipakai situs. `photo_wa.jpg` dan kedua favicon lama juga dipertahankan.
- Tiga screenshot Nimonspedia dari Drive asli pemilik: Product Discovery, Product Detail, Store Detail. Repo 404; tidak ada source link rusak atau demo rekaan.
- Little Alchemy adalah screenshot Chrome dari live demo setelah melewati layar pembuka. Keberhasilan semua endpoint backend eksternal tidak diklaim.
- MAI hanya conceptual workflow; tanpa screenshot/data/kode/URL internal. FFNN memakai diagram berdasarkan kode NumPy, tanpa angka benchmark rekaan.
- Preview asli CV ATS memuat data kandidat dan tidak dipublikasikan. CV ATS dan Luma memakai diagram konseptual berlabel.
- Favicon publik sengaja diganti agar sesuai monogram baru. Social card baru memiliki dimensi aktual 1200×630.
- Font self-hosted dengan lisensi OFL tersimpan. Tidak ada request font/gambar eksternal saat runtime.

`scripts/prepare-assets.py` opsional untuk membuat ulang derivative dengan Pillow dan original screenshot di `.local-backup/media/`. Build biasa tidak memerlukannya karena derivative final disertakan. `scripts/capture-demo.mjs` mengulangi capture Little Alchemy; tinjau hasil sebelum mengganti aset publik.

## QA

Setelah build, jalankan preview di terminal pertama; di terminal kedua:

```sh
npm run test:browser
```

Suite memakai Google Chrome lokal. Jika tidak tersedia, instal browser Playwright dan sesuaikan `channel` di `playwright.config.ts`. Suite menguji 375/768/1280/1440px, dua tema, sepuluh route, gambar, overflow, console, axe, tema, menu keyboard, filter, PDF, dan tanpa JavaScript. Screenshot/laporan mentah ada di `.local-backup/qa/` (ignored).

Suite motion juga memeriksa animasi yang benar-benar berjalan, trace dengan keyboard, reveal sekali tampil, dan pembatalan saat reduced-motion berubah. Jika port default sedang dipakai dev server, jalankan preview pada port lain dan atur `PORTFOLIO_PREVIEW_URL` ke URL preview tersebut sebelum tes (contoh PowerShell: `$env:PORTFOLIO_PREVIEW_URL='http://127.0.0.1:4322'`).

`npm test` memeriksa local links/anchors, metadata unik, sitemap, image alt/dimensions, serta hash PDF. `npm run lint` memeriksa formatting; `npm run check` memeriksa Astro/TypeScript. Hasil aktual: [docs/qa.md](docs/qa.md).

## Vercel preview dan rilis

`vercel.json`: Astro, build `npm run build`, output `dist`. `.vercelignore` mengecualikan runtime lokal, backup, agent state dan hasil QA. Tidak ada credential atau `.vercel/project.json` tersedia selama pengerjaan; **belum ada deployment preview/URL preview**.

Login dan link ke **project portfolio lama yang sudah memiliki deployment**, lalu targetkan preview:

```sh
npx vercel login
npx vercel link
npx vercel deploy --target=preview --meta githubDeployment=1 --meta githubCommitRef=redesign/portfolio-2026
```

Pilih existing project yang benar saat `link`. Jangan membuat project baru pada alur ini: dokumentasi Vercel saat ini menyebut deployment pertama project baru menjadi production, termasuk dengan target preview. Rujukan: [environments](https://vercel.com/docs/deployments/environments), [CLI deploy](https://vercel.com/docs/cli/deploy). Gunakan URL yang benar-benar dikembalikan command, lalu ulangi pengecekan route/PDF/tema di sana.

Alternatif existing Git integration: tinjau diff, push hanya branch redesign, dan ambil preview dari dashboard Vercel. Tidak ada push otomatis selama pengerjaan.

**Produksi memerlukan persetujuan eksplisit pemilik.** Setelah preview disetujui, tinjau PR dan auto-deploy proyek lama; merge ke main dapat memicu produksi. Jangan menjalankan `--prod`, mempromosikan deployment, atau mengubah domain/DNS sebelum persetujuan. Rollback setelah rilis dapat memakai deployment lama di Vercel; main dan riwayat Git tetap tersedia.

## Backup dan batasan

Snapshot lengkap awal ada di `.local-backup/original-2026-11-05.zip` (lokal, ignored). `legacy/` menyimpan sumber HTML/sitemap lama. Aset asli dan file instruksi pemilik yang awalnya untracked dipertahankan.

Tindak lanjut: autentikasi preview Vercel, penyelarasan tanggal PDF, pemulihan akses repo Nimonspedia jika ingin menampilkan source link. Browser QA memakai Chrome, bukan Safari/Firefox atau screen reader penuh. Skor Lighthouse lokal bukan jaminan field performance hosting. Tidak ada input kritis yang menghalangi situs lokal.
