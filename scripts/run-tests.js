const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const PORT = process.env.TEST_PORT || 3000;
const SOURCE_FILES = ["codec.js", "config.js", "engine.js", "create.js"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.coverage.startJSCoverage();

  await page.goto(`http://localhost:${PORT}/test.html`);
  await page.waitForSelector(".summary", { timeout: 15000 });

  const title = await page.title();
  const passed = await page.locator(".pass:not(.summary .pass)").count();
  const failed = await page.locator(".fail:not(.summary .fail)").count();
  const total = passed + failed;

  const summaryText = await page.locator(".summary").textContent();
  console.log("Summary: " + summaryText);
  console.log("Title: " + title);
  console.log(
    "Tests: " + passed + " passed, " + failed + " failed, " + total + " total",
  );

  fs.writeFileSync(
    "test-results.json",
    JSON.stringify({ passed, failed, total }),
  );

  const coverage = await page.coverage.stopJSCoverage();

  let totalBytes = 0;
  let usedBytes = 0;

  for (const entry of coverage) {
    const url = new URL(entry.url);
    const fileName = path.basename(url.pathname);
    if (!SOURCE_FILES.includes(fileName)) continue;

    const sourceLength = entry.source.length;
    totalBytes += sourceLength;

    const uncoveredRanges = [];
    for (const fn of entry.functions) {
      for (const range of fn.ranges) {
        if (range.count === 0) {
          uncoveredRanges.push([range.startOffset, range.endOffset]);
        }
      }
    }
    uncoveredRanges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let uncoveredBytes = 0;
    let lastEnd = -1;
    for (const [start, end] of uncoveredRanges) {
      const effectiveStart = Math.max(start, lastEnd);
      if (effectiveStart < end) {
        uncoveredBytes += end - effectiveStart;
      }
      lastEnd = Math.max(lastEnd, end);
    }
    usedBytes += sourceLength - uncoveredBytes;
  }

  const coveragePercent =
    totalBytes > 0 ? Math.round((usedBytes / totalBytes) * 100) : 0;
  console.log("Coverage: " + coveragePercent + "%");

  fs.writeFileSync(
    "coverage-results.json",
    JSON.stringify({ coveragePercent, totalBytes, usedBytes }),
  );

  await browser.close();
  if (failed > 0) process.exit(1);
})();
