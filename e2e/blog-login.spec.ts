// Login and Logout test for myBlog

import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("https://aaakul.github.io");

  // Expect redirected successfully
  await expect(page).toHaveTitle(/my Blog/);
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("*Username").click();
  await page.getByPlaceholder("*Username").fill("playwright");
  await page.getByPlaceholder("*Password").click();
  await page.getByPlaceholder("*Password").fill("123@q");
  await page.getByRole("button", { name: "Login" }).click();
  // Expect logged in
  await expect(page.getByRole("link", { name: "New Blog" })).toBeVisible();
  // Expect able to logout
  await page.getByText("Logout").click();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
