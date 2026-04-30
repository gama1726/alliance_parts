import { expect, test } from "@playwright/test";

test("search flow opens product card", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("header-search-input").fill("OE31601");
  await page.getByTestId("header-search-submit").click();
  await expect(page).toHaveURL(/\/search\?q=OE31601/);
  await expect(page.getByTestId("search-page")).toBeVisible();
  await page.getByTestId("search-result-product").click();
  await expect(page).toHaveURL(/\/product\/oe31601/);
  await expect(page.getByText("Фильтр масляный")).toBeVisible();
});

test("product flow adds item to cart", async ({ page }) => {
  await page.goto("/product/oe31601");
  await page.getByTestId("product-add-to-cart").first().click();
  await expect(page.getByText("Добавлено в корзину")).toBeVisible();
  await page.getByTestId("header-cart-button").click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByTestId("cart-page")).toBeVisible();
  await expect(page.getByText("Фильтр масляный")).toBeVisible();
});

test("vin flow shows resolved vehicle", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("header-search-input").fill("VF3MJAHXVGS314095");
  await page.getByTestId("header-search-submit").click();
  await expect(page).toHaveURL(/\/search\?q=VF3MJAHXVGS314095/);
  await expect(page.getByText("Авто по VIN")).toBeVisible();
  await expect(page.getByText("PEUGEOT 3008", { exact: true })).toBeVisible();
});
