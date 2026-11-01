import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const browser = await chromium.launch()
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  })
  await page.goto(process.env.DEMO_URL || 'http://127.0.0.1:4173/kanban/#/board')
  await page.getByRole('heading', { name: 'Project board', exact: true }).waitFor()
  await page
    .locator('body')
    .evaluate((body) => body.ownerDocument.fonts.ready.then(() => undefined))
  await mkdir('docs/images', { recursive: true })
  await page.screenshot({ path: 'docs/images/board.png', fullPage: true })
  console.log('Saved docs/images/board.png')
} finally {
  await browser.close()
}
