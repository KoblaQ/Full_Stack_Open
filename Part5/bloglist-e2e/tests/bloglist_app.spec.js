const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createUser } = require('./helper')
const { before } = require('node:test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //Empty the database (from the reset controler in the backend)
    await request.post('/api/testing/reset')

    // Create a user for the backend
    await createUser(request, 'Test User', 'KoblaQ', 'salainen') // Create first User
    await createUser(request, 'Second Test_User', 'Tester', 'salainen') // Create second User

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
      await loginWith(page, 'KoblaQ', 'salainen') // Login with first user
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'New note created by playwright',
        'PlaywrightApp',
        'https://playwright.dev/'
      )

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

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(
        page,
        'Blog to be deleted',
        'PlaywrightAppDelete',
        'https://playwright.dev/'
      )

      await expect(
        page.getByText('Blog to be deleted PlaywrightAppDelete')
      ).toBeVisible()

      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      // Register the dialog handler for confirming
      page.on('dialog', (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toContain(
          'Remove blog Blog to be deleted by PlaywrightAppDelete'
        )
        dialog.accept()
      })

      await page.getByRole('button', { name: 'remove' }).click() // Set up the dialog handler above before this

      // Check to confirm that the post has been deleted
      await expect(
        page.getByText('Blog to be deleted PlaywrightAppDelete')
      ).not.toBeVisible()
    })

    describe('Multiple users with multiple blogs', () => {
      beforeEach(async ({ page }) => {
        // Create a blog with the first user
        await createBlog(
          page,
          'First User Blog',
          'PlaywrightAppFirstUser',
          'https://playwright.dev/'
        )

        // Create a second blog with the first user
        await createBlog(
          page,
          'First User Blog number 2',
          'PlaywrightAppFirstUser',
          'https://playwright.dev/'
        )

        // Logout first user out
        await page.getByRole('button', { name: 'logout' }).click()

        // Login with second user
        await loginWith(page, 'Tester', 'salainen')

        // Create a third blog with the second user
        await createBlog(
          page,
          'Second User first Blog',
          'PlaywrightAppSecondUser',
          'https://playwright.dev/'
        )

        // Create a forth blog with the second user
        await createBlog(
          page,
          'Second User fourth Blog',
          'PlaywrightAppSecondUser',
          'https://playwright.dev/'
        )
      })

      test('only a user who created the blog can see the remove button', async ({
        page,
      }) => {
        // Get the second user's blog element
        const secondUserBlogElement = page
          .getByText('Second User first Blog PlaywrightAppSecondUser')
          .locator('..')

        // Get the first user's blog element
        const firstUserBlogElement = page
          .getByText('First User Blog PlaywrightAppFirstUser')
          .locator('..')

        // Expand the blog details and check that remove button is not visible for logged out user
        await secondUserBlogElement
          .getByRole('button', { name: 'view' })
          .click()

        // Check that the remove button is visible to the Second User who is logged in.
        await expect(
          secondUserBlogElement.getByRole('button', { name: 'remove' })
        ).toBeVisible()

        // Expand the blog details and check that remove button is not visible for logged out user
        await firstUserBlogElement.getByRole('button', { name: 'view' }).click()
        await expect(
          firstUserBlogElement.getByRole('button', { name: 'remove' })
        ).not.toBeVisible()
      })

      test('blogs are arranged in descending order of likes', async ({
        page,
      }) => {
        // Get the second user's blog element
        const secondUserBlogElement = page
          .getByText('Second User first Blog PlaywrightAppSecondUser')
          .locator('..')

        // Get the first user's blog element
        const firstUserBlogElement = page
          .getByText('First User Blog PlaywrightAppFirstUser')
          .locator('..')

        // Like second user's blog
        await secondUserBlogElement
          .getByRole('button', { name: 'view' })
          .click()
        await secondUserBlogElement
          .getByRole('button', { name: 'like' })
          .click()
        await secondUserBlogElement.getByText('likes 1').waitFor()

        // DO IT AGAIN
        await secondUserBlogElement
          .getByRole('button', { name: 'like' })
          .click()
        await secondUserBlogElement.getByText('likes 2').waitFor()

        await secondUserBlogElement
          .getByRole('button', { name: 'like' })
          .click()
        await secondUserBlogElement.getByText('likes 3').waitFor()

        // // Like the first blog post 5 times
        // for(let i= 1; i <= 5; i++) {
        // 	await
        // }
      })
    })
  })
})
