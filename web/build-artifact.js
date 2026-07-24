/*
 * Build a single self-contained HTML from the web/ source files, so the
 * "playable anywhere" build (and the shared preview artifact) is generated
 * from the real code and can never drift from it.
 *
 *   node web/build-artifact.js
 *
 * Output: dist/pawn-master-standalone.html
 */
const fs = require("fs");
const path = require("path");

const webDir = __dirname;
const read = (p) => fs.readFileSync(path.join(webDir, p), "utf8");

const css = read("css/theme.css");
const scripts = ["js/data.js", "js/art.js", "js/core.js", "js/ui.js"].map(read).join("\n");

// Pull the <body> inner markup out of index.html, minus the <script> tags
// (we inline those) — keep the .device / .caption structure.
const indexHtml = read("index.html");
const bodyInner = indexHtml
  .replace(/[\s\S]*<body>/, "")
  .replace(/<\/body>[\s\S]*/, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .trim();

// Full standalone document — open directly or host anywhere.
const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Pawn Master — Merrick's</title>
<style>
${css}
</style>
</head>
<body>
${bodyInner}
<script>
${scripts}
</script>
</body>
</html>
`;

// Body-content-only variant — for hosts that supply their own document
// skeleton (e.g. the Claude Artifact wrapper). No doctype/html/head/body.
const bodyOnly = `<title>Pawn Master — Merrick's</title>
<style>
${css}
</style>
${bodyInner}
<script>
${scripts}
</script>
`;

const distDir = path.join(webDir, "..", "dist");
fs.mkdirSync(distDir, { recursive: true });
const outPath = path.join(distDir, "pawn-master-standalone.html");
fs.writeFileSync(outPath, fullDoc);
console.log("Wrote", outPath, "(" + fullDoc.length + " bytes)");

// Optional second output path (body-only) for an external host.
if (process.argv[2]) {
  fs.writeFileSync(process.argv[2], bodyOnly);
  console.log("Wrote", process.argv[2], "(" + bodyOnly.length + " bytes)");
}
