import { expect, test, type Page } from '@playwright/test'

const group = (page: Page, name: string) => page.getByRole('region', { name, exact: true })
const task = (page: Page, title: string) => page.getByRole('article', { name: title, exact: true })

test.beforeEach(async ({ page }) => {
  await page.goto('./#/board')
  await expect(page.getByRole('heading', { name: 'Project board' })).toBeVisible()
})

test('creates groups and tasks and restores them after refresh', async ({ page }) => {
  await page.getByRole('button', { name: 'New list' }).click()
  await page.getByLabel('List title').fill('Review')
  await page.getByRole('button', { name: 'Create list', exact: true }).click()
  await group(page, 'Review').getByRole('button', { name: 'Add card' }).click()
  await page.getByLabel('Card title').fill('Check the release')
  await page.getByRole('button', { name: 'Create card', exact: true }).click()
  await page.reload()
  await expect(
    group(page, 'Review').getByRole('article', { name: 'Check the release' }),
  ).toBeVisible()
})

test('reorders with the keyboard, cancels a drag, and retains order after refresh', async ({
  page,
}) => {
  const card = task(page, 'Define domain models')
  await card.focus()
  await card.press('Space')
  await expect(
    page.getByText(
      'Draggable item domain-models was moved over droppable area task:string:domain-models.',
      { exact: true },
    ),
  ).toBeAttached()
  await page.keyboard.press('ArrowDown')
  await expect(
    page.getByText(
      'Draggable item domain-models was moved over droppable area task:string:routes.',
      { exact: true },
    ),
  ).toBeAttached()
  await page.keyboard.press('Space')
  await expect(group(page, 'To do').getByRole('article').first()).toHaveAccessibleName(
    'Configure application routes',
  )
  await card.press('Space')
  await expect(card).toHaveAttribute('aria-pressed', 'true')
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
  await page.keyboard.press('Escape')
  await expect(card).not.toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('status')).toContainText('Dragging was cancelled')
  await page.reload()
  await expect(group(page, 'To do').getByRole('article').first()).toHaveAccessibleName(
    'Configure application routes',
  )
})

test('moves a card with the pointer across groups and into an empty group', async ({ page }) => {
  const move = async (title: string, targetName: string) => {
    const source = task(page, title)
    const target = group(page, targetName)
    await source.scrollIntoViewIfNeeded()
    const from = (await source.boundingBox())!
    const to = (await target.boundingBox())!
    await page.mouse.move(from.x + 40, from.y + 70)
    await page.mouse.down()
    await page.mouse.move(to.x + to.width / 2, to.y + 120, { steps: 24 })
    await page.mouse.up()
    await expect(target.getByRole('article', { name: title, exact: true })).toHaveCount(1)
  }
  await move('Initialize Vite, React, and TypeScript', 'To do')
  await expect(group(page, 'Done').getByRole('article')).toHaveCount(0)
  await move('Define domain models', 'Done')
  await page.reload()
  await expect(
    group(page, 'Done').getByRole('article', { name: 'Define domain models' }),
  ).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(4)
})

test('confirms deletion without starting a drag and persists removal', async ({ page }) => {
  const title = 'Define domain models'
  await page.getByRole('button', { name: `Delete ${title}`, exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(task(page, title)).toBeVisible()
  await page.getByRole('button', { name: `Delete ${title}`, exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Delete task', exact: true }).click()
  await expect(task(page, title)).toHaveCount(0)
  await expect(page.getByRole('article')).toHaveCount(3)
  await page.reload()
  await expect(task(page, title)).toHaveCount(0)
})

test('loads the static-hosting home page and supports navigation and reload', async ({ page }) => {
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'Keep your work visible and moving forward.' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Open board' }).click()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Project board' })).toBeVisible()
})
