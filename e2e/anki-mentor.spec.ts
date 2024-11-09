import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://aaakul.github.io/anki-mentor/");
  await expect(page.getByText("*Demo version*")).toBeVisible();
  // Japanese by default
  // Simulate entering words
  await page.getByText("New word").click();
  // test words split function
  await page
    .getByRole("textbox")
    .fill("Words,should;be　split、 automatically");
  await page.getByRole("textbox").press("Enter");
  await page.getByLabel("send").click();
  await expect(page.locator(".output-text")).toContainText(
    "Words: Words,should,be,split,automatically; Regenerate: false; Lorem text: あら、蠍の火"
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
    "Words: Words,should,be,split,automatically; Regenerate: false; Lorem text: Lorem, ipsum"
  );
  // Copy function
  await page.getByLabel("copy").click();
  await expect(page.getByText("Copied to clipboard")).toBeVisible();

  // Regenerate function
  await page.getByLabel("reload").click();
  await expect(page.locator(".output-text")).toContainText(
    "Words: Words,should,be,split,automatically; Regenerate: true; Lorem text: Lorem, ipsum"
  );
  await page.getByText("Clear all").click();

  // Question icon
  await page.getByLabel("question-circle").click();
  await expect(page.getByText("How to use?")).toBeVisible();
});
