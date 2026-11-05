import {
  readdir,
  mkdir,
  readFile,
  writeFile,
  copyFile,
  rm,
} from "node:fs/promises";
import path from "node:path";

const variants = [
  {
    key: "Fullstack",
    label: "Fullstack / Software Engineer",
    description:
      "APIs, databases, web applications, and the systems connecting them.",
  },
  {
    key: "FE",
    label: "Frontend Engineer",
    description:
      "React interfaces, responsive web experiences, and product implementation.",
  },
  {
    key: "AI",
    label: "AI Engineer",
    description:
      "Applied AI workflows, neural network fundamentals, and data processing.",
  },
];
const files = await readdir("CV").catch(() => []);
await mkdir("public/resumes", { recursive: true });
// This directory is generated solely from the owner's source PDFs.
for (const old of await readdir("public/resumes")) {
  if (/^Muhammad-Timur-Kanigara-(Fullstack|FE|AI)\.pdf$/.test(old))
    await rm(path.join("public/resumes", old));
}
const records = [];
for (const variant of variants) {
  const matches = files.filter(
    (file) =>
      file.toLowerCase().replace(/[\s_-]+/g, "") ===
      `cvmuhammadtimurkanigara${variant.key}.pdf`.toLowerCase(),
  );
  if (matches.length > 1) throw new Error(`Ambiguous resume: ${variant.key}`);
  const source = matches[0];
  let href = null;
  let size = 0;
  if (source) {
    const buffer = await readFile(path.join("CV", source));
    if (buffer.subarray(0, 5).toString() !== "%PDF-")
      throw new Error(`Invalid PDF: ${source}`);
    const name = `Muhammad-Timur-Kanigara-${variant.key}.pdf`;
    await copyFile(path.join("CV", source), path.join("public/resumes", name));
    href = `/resumes/${name}`;
    size = buffer.length;
  }
  records.push({ ...variant, href, size });
}
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/resumes.json",
  JSON.stringify(records, null, 2) + "\n",
);
console.log(`Resumes: ${records.filter((r) => r.href).length}/3 available`);
