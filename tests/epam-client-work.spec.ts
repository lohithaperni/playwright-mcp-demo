import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  await page.goto('/');

  // Ensure desktop header is present
  await page.setViewportSize({ width: 1440, height: 900 });

  // "Services" in the header (desktop nav). Some layouts render it as link, others as button.
  const mainNav = page.getByRole('navigation', { name: /main navigation/i });
  const services = mainNav.getByRole('link', { name: /^services$/i }).or(
    mainNav.getByRole('button', { name: /^services$/i })
  );
  await services.first().click();

  // Click "Explore Our Client Work" (exists in hero on homepage; also reachable from Services page).
  await page.getByRole('link', { name: /explore our client work/i }).first().click();

  // Assertion
  await expect(page.getByRole('heading', { name: /client work/i, level: 1 })).toBeVisible();
});
