import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("*Development version*")).toBeVisible();

  // Generate Japanese text by default
  // Simulate entering words
  await page.getByText("New word").click();
  // test words split function
  await page
    .getByRole("textbox")
    .fill("Words,should;be　split、 automatically");
  await page.getByRole("textbox").press("Enter");
  await page.getByLabel("send").click();
  await expect(page.locator(".output-text")).toContainText(
    "From backend: Words: Words,should,be,split,automatically; Regenerate: False; Lorem text: あら、蠍の火"
  );

  // Change to English
  await page.getByLabel("setting").locator("svg").click();
  await page.locator("label").filter({ hasText: "English" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  // Clear function
  await page.getByText("Clear all").click();
  await page.getByText("New word").click();
  await page
    .getByRole("textbox")
    .fill("Words,should;be　split、automatically ");
  await page.getByRole("textbox").press("Enter");
  await page.getByLabel("send").click();
  await expect(page.locator(".output-text")).toContainText(
    "From backend: Words: Words,should,be,split,automatically; Regenerate: False; Lorem text: Lorem, ipsum"
  );
  // Copy function
  await page.getByLabel("copy").click();
  await expect(page.getByText("Copied to clipboard")).toBeVisible();

  // Regenerate function
  await page.getByLabel("reload").click();
  await expect(page.locator(".output-text")).toContainText(
    "From backend: Words: Words,should,be,split,automatically; Regenerate: True; Lorem text: Lorem, ipsum"
  );
  await page.getByText("Clear all").click();

  // Question icon
  await page.getByLabel("question-circle").click();
  await expect(page.getByText("How to use?")).toBeVisible();
});
