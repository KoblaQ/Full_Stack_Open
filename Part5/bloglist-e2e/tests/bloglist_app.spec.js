const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //Empty the database (from the reset controler in the backend)
    await request.post('/api/testing/reset')

    // Create a user for the backend
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'KoblaQ',
        password: 'salainen',
      },
    })

    // Go to the login page
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    const usernameField = page.getByLabel('username')
    const passwordField = page.getByLabel('password')
    const loginButton = page.getByRole('button', { name: 'login' })
    await expect(locator).toBeVisible()
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'KoblaQ', 'salainen')

      await expect(page.getByText('Test User logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrongUsername', 'wrongPassword')

      // Error message should be printed at the right place
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // Colors must be defined in playwright as rgb codes.

      // Should still remain on the login page
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'KoblaQ', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'New note created by playwright',
        'PlaywrightApp',
        'https://playwright.dev/'
      )
      // await page.getByRole('button', { name: 'create new blog' }).click()

      // await page.getByLabel('title:').fill('New note created by playwright')
      // await page.getByLabel('author:').fill('PlaywrightApp')
      // await page.getByLabel('url:').fill('https://playwright.dev/')

      // await page.getByRole('button', { name: 'create' }).click()
      // await page.getByRole('button', { name: 'cancel' }).click()

      // Error message should be printed at the right place
      const notificationDiv = page.locator('.message')
      await expect(notificationDiv).toContainText(
        'a new blog New note created by playwright by PlaywrightApp added'
      )
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(
        page.getByText('New note created by playwright PlaywrightApp')
      ).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'New likeBlog created by playwright',
        'PlaywrightAppLike',
        'https://playwright.dev/'
      )

      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})
