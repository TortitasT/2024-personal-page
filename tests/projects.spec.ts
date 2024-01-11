import { test, expect } from '@playwright/test'

test('searchbar can add filters', async ({ page }) => {
  await page.goto('/projects')
  await page.waitForTimeout(1000)

  await page.getByPlaceholder('Search technologies, projects, etc.').fill('Vue')
  await page.waitForTimeout(1000)

  await expect(
    page.getByRole('heading', { name: 'Vue', exact: true })
  ).toBeVisible()
})
