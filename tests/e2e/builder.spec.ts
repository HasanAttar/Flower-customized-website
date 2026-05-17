import { expect, test } from "@playwright/test";

test("customer can open bouquet builder", async ({ page }) => {
  await page.goto("/builder");
  await expect(page.getByRole("heading", { name: "Custom bouquet builder" })).toBeVisible();
  await expect(page.getByLabel("Live bouquet preview")).toBeVisible();
});
