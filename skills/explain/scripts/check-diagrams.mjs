#!/usr/bin/env node
// Measures the rendered mermaid diagrams of an explainer page in headless Chrome.
// Usage: node check-diagrams.mjs <page.html>
// Exit codes: 0 pass, 1 a check failed, 2 the check could not run.
//
// Zero dependencies on purpose: the skill runs in many agents and projects, so
// it drives an installed Chrome with --dump-dom instead of requiring Playwright.
// A probe script appended to a temporary copy of the page writes its
// measurements into the DOM, and Chrome prints that DOM when virtual time runs out.

import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DESKTOP = { width: 1140, height: 1000 };
const PHONE = { width: 390, height: 844 };
const MIN_CONTRAST = 4.5;

const PROBE = `
<script>
(function () {
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function colours() {
    return Array.prototype.map.call(document.querySelectorAll(".mermaid-out svg"), function (svg) {
      var node = svg.querySelector(".node rect, .node polygon, rect.actor");
      // A grouped selector would return text.actor before its tspan, and only the tspan carries the text colour.
      var label = svg.querySelector(".nodeLabel") || svg.querySelector("text.actor tspan");
      var text = null;
      if (label) text = label.classList.contains("nodeLabel") ? getComputedStyle(label).color : getComputedStyle(label).fill;
      return { node: node && getComputedStyle(node).fill, text: text };
    });
  }
  setTimeout(async function () {
    var box = document.querySelector(".diagram");
    var result = {
      diagrams: document.querySelectorAll(".mermaid-out").length,
      usable: box ? box.clientWidth - 32 : null,
      svgs: Array.prototype.map.call(document.querySelectorAll(".mermaid-out svg"), function (s) {
        return Math.round(s.getBoundingClientRect().width);
      }),
      fallbacks: document.querySelectorAll(".mermaid-fallback").length,
      pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
      light: null,
      dark: null
    };
    document.documentElement.setAttribute("data-theme", "light");
    await wait(1500);
    result.light = colours();
    document.documentElement.setAttribute("data-theme", "dark");
    await wait(1500);
    result.dark = colours();
    var out = document.createElement("pre");
    out.id = "__diagram_check";
    out.textContent = JSON.stringify(result);
    document.body.appendChild(out);
  }, 3000);
})();
</script>
`;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
    "microsoft-edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);
  return candidates.find((bin) => spawnSync(bin, ["--version"], { stdio: "ignore" }).status === 0);
}

function measure(chrome, url, size, profile) {
  const run = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      `--window-size=${size.width},${size.height}`,
      "--virtual-time-budget=20000",
      "--dump-dom",
      url,
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 120000 },
  );
  const match = /<pre id="__diagram_check">([^<]*)<\/pre>/.exec(run.stdout || "");
  if (!match) {
    throw new Error(`Chrome produced no measurements at ${size.width}px.\n${run.stderr || ""}`.trim());
  }
  return JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
}

function luminance(colour) {
  const parts = /rgba?\(([^)]+)\)/.exec(colour || "");
  if (!parts) return null;
  const [r, g, b] = parts[1].split(/[ ,/]+/).slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function colourFailures(theme, samples) {
  return samples.flatMap((s, i) => {
    const ratio = contrast(s.text, s.node);
    if (ratio === null) return [`diagram ${i + 1} (${theme}): could not read text or node colour`];
    if (ratio < MIN_CONTRAST) {
      return [`diagram ${i + 1} (${theme}): text ${s.text} on ${s.node} has contrast ${ratio.toFixed(2)}, needs ${MIN_CONTRAST}`];
    }
    return [];
  });
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: node check-diagrams.mjs <page.html>");
  process.exit(2);
}

const chrome = findChrome();
if (!chrome) {
  console.error("No Chrome, Chromium or Edge found. Set CHROME_PATH to the browser binary.");
  process.exit(2);
}

const work = mkdtempSync(join(tmpdir(), "explain-check-"));
try {
  const html = readFileSync(resolve(file), "utf8");
  const page = join(work, "page.html");
  writeFileSync(page, html.includes("</body>") ? html.replace("</body>", `${PROBE}</body>`) : html + PROBE);
  const url = pathToFileURL(page).href;

  const desktop = measure(chrome, url, DESKTOP, join(work, "profile"));
  const phone = measure(chrome, url, PHONE, join(work, "profile"));

  const failures = [];
  if (desktop.diagrams === 0) failures.push("no .mermaid-out diagrams found");
  if (desktop.fallbacks > 0) failures.push(`${desktop.fallbacks} diagram(s) failed to render and show the fallback source`);
  desktop.svgs.forEach((w, i) => {
    if (w > desktop.usable) failures.push(`diagram ${i + 1} is ${w}px wide on desktop, budget is ${desktop.usable}px`);
  });
  if (desktop.pageOverflow) failures.push("the page scrolls sideways on desktop");
  if (phone.pageOverflow) failures.push("the page scrolls sideways at phone width");
  failures.push(...colourFailures("light", desktop.light), ...colourFailures("dark", desktop.dark));

  console.log(JSON.stringify({ desktop, phone: { pageOverflow: phone.pageOverflow } }, null, 2));
  if (failures.length) {
    console.log("\nFAIL");
    failures.forEach((f) => console.log(`- ${f}`));
    process.exitCode = 1;
  } else {
    console.log(`\nPASS: ${desktop.svgs.length} diagram(s), widest ${Math.max(...desktop.svgs)}px of ${desktop.usable}px`);
  }
} catch (err) {
  console.error(err.message);
  process.exitCode = 2;
} finally {
  rmSync(work, { recursive: true, force: true });
}
