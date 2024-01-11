import { test, expect } from '@playwright/test'

test('menu opens from index page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.waitForTimeout(1000)

  await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
})

test('menu opens from about page', async ({ page }) => {
  await page.goto('/about')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.waitForTimeout(1000)

  await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
})

test('menu opens from projects page', async ({ page }) => {
  await page.goto('/projects')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.waitForTimeout(1000)

  await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
})

test('menu opens from blog page', async ({ page }) => {
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.waitForTimeout(1000)

  await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
})
