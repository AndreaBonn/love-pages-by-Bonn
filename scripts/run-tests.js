const { chromium } = require("playwright");
const fs = require("fs");

const PORT = process.env.TEST_PORT || 3000;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
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
    "Tests: " + passed + " passed, " + failed + " failed, " + total + " total"
  );

  fs.writeFileSync(
    "test-results.json",
    JSON.stringify({ passed, failed, total })
  );

  await browser.close();
  if (failed > 0) process.exit(1);
})();
