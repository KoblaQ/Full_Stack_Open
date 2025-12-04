const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //Empty the database (from the reset controler in the backend)
    await request.post('http://localhost:3003/api/testing/reset')

    // Create a user for the backend
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'KoblaQ',
        password: 'salainen',
      },
    })

    // Go to the login page
    await page.goto('http://localhost:5173')
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
})
