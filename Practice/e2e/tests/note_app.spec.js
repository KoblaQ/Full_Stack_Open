const { describe, test, expect, beforeEach } = require('@playwright/test')
const { createNote, loginWith } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test Coder',
        username: 'KoblaQ',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    // await page.goto('http://localhost:5173')

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2025'
      )
    ).toBeVisible()
  })

  test('user can log in with correct credentials', async ({ page }) => {
    // await page.goto('http://localhost:5173')

    // await page.getByRole('button', { name: 'login' }).click()
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('KoblaQ')
    // await textboxes[1].fill('password')
    // await page.getByRole('textbox').first().fill('KoblaQ')
    // await page.getByRole('textbox').last().fill('password')
    // await page.getByLabel('username').fill('KoblaQ')
    // await page.getByLabel('password').fill('salainen')
    // await page.getByRole('button', { name: 'login' }).click()

    await loginWith(page, 'KoblaQ', 'salainen')
    await expect(page.getByText('Test Coder logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'KoblaQ', 'wrongPassword')

    // await page.getByRole('button', { name: 'login' }).click()
    // await page.getByLabel('username').fill('KoblaQ')
    // await page.getByLabel('password').fill('wrong')
    // await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('wrong credentials')).toBeVisible()

    // Ensure that the error message is printed in the right place.
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // Colors must be defined in playwright as rgb codes.

    await expect(page.getByText('Test Coder logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'KoblaQ', 'salainen')

      // await page.getByRole('button', { name: 'login' }).click()
      // await page.getByLabel('username').fill('KoblaQ')
      // await page.getByLabel('password').fill('salainen')
      // await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      // await page.getByRole('button', { name: 'new note' }).click()
      // await page.getByRole('textbox').fill('a note created by playwright')
      // await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note by playwright')
        // await page.getByRole('button', { name: 'new note' }).click()
        // await page.getByRole('textbox').fill('another note by playwright')
        // await page.getByRole('button', { name: 'save' }).click()
        await expect(page.getByText('another note by playwright')).toBeVisible()
      })

      test('importance can be changed', async ({ page }) => {
        // await page.pause()
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })

    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        await page.pause()
        // const otherNoteElement = page.getByText('first note')
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement
          .getByRole('button', { name: 'make not important' })
          .click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})
