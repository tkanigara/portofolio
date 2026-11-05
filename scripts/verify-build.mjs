import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk("dist");
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const titles = new Set();
let links = 0;
let images = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route =
    "/" +
    path
      .relative("dist", file)
      .replaceAll("\\", "/")
      .replace(/index\.html$/, "");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One h1: ${route}`);
  assert(
    /<meta name="description" content="[^"]{35,}"/.test(html),
    `Description: ${route}`,
  );
  assert(
    html.includes(`href="https://www.timurkanigara.my.id${route}"`),
    `Canonical: ${route}`,
  );
  assert(
    html.includes("og:image:width") && html.includes("1200"),
    `OG dimensions: ${route}`,
  );
  assert(
    !/third-year|3rd-year|URL-WEBSITE-KAMU|timurkanigara@gmail\.com|MAI_Experiment|\/archive\/refs\//i.test(
      html,
    ),
    `No stale or prohibited copy: ${route}`,
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `No duplicate IDs: ${route}`);
  for (const match of html.matchAll(
    /<(?:a|link|img|script)\b[^>]*\b(?:href|src)="([^"]+)"[^>]*>/g,
  )) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    const url = new URL(href, "https://test.local" + route);
    let destination = path.join("dist", decodeURIComponent(url.pathname));
    if ((await stat(destination).catch(() => null))?.isDirectory())
      destination = path.join(destination, "index.html");
    assert(
      await stat(destination).catch(() => false),
      `Missing local target ${href} from ${route}`,
    );
    if (url.hash && destination.endsWith(".html")) {
      const target = await readFile(destination, "utf8");
      assert(
        target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Missing anchor ${href} from ${route}`,
      );
    }
    links++;
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt="[^"]+"/.test(match[0]), `Image alt: ${route}`);
    assert(
      /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
      `Image dimensions: ${route}`,
    );
    images++;
  }
}
assert.equal(
  htmlFiles.length,
  10,
  "Home, projects, 6 case studies, resume, 404",
);
const resumes = JSON.parse(await readFile("src/data/resumes.json", "utf8"));
for (const resume of resumes) {
  assert(resume.href, `Expected owner resume ${resume.key}`);
  const bytes = await readFile(path.join("dist", resume.href));
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  const original = (await readdir("CV")).find((file) =>
    file.toLowerCase().endsWith(`-${resume.key.toLowerCase()}.pdf`),
  );
  const source = await readFile(path.join("CV", original));
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    createHash("sha256").update(source).digest("hex"),
    "Resume unchanged",
  );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 9);
assert(!sitemap.includes("404"));
assert(
  (await readFile("dist/robots.txt", "utf8")).includes(
    "https://www.timurkanigara.my.id/sitemap.xml",
  ),
);
console.log(
  `PASS: ${htmlFiles.length} HTML routes, ${links} local references, ${images} images, 3 byte-identical PDFs, unique metadata, anchors and sitemap.`,
);
