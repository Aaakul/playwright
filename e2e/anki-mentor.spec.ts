import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://aaakul.github.io/anki-mentor/");
  await expect(page.getByText("*Demo*")).toBeVisible();
  // Japanese by default
  await page.getByText("New word").click();
  await page.getByRole("textbox").fill("Japanses");
  await page.getByRole("textbox").press("Enter");
  await page.getByLabel("send").click();
  await expect(page.locator("#output")).toContainText(
    "User input: Japanses; Lorem text: あら"
  );
  // Change to English
  await page.getByLabel("setting").locator("svg").click();
  await page.locator("label").filter({ hasText: "English" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("Clear all").click(); // Delete word
  await page.getByText("New word").click();
  await page.getByRole("textbox").fill("English");
  await page.getByRole("textbox").press("Enter");
  await page.getByLabel("send").click();
  await expect(page.locator("#output")).toContainText(
    "User input: English; Lorem text: Lorem"
  );
  // Copy function
  await page.getByLabel("copy").click();
  await expect(page.getByText("Copied to clipboard")).toBeVisible();
  // Question icon
  await page.getByLabel("question-circle").click();
  await expect(page.getByText("How to use?")).toBeVisible();
});
