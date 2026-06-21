import { test, expect } from '@playwright/test'

test.describe('Page rendering', () => {
  test('homepage loads and shows title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.doc-title')).toContainText('context.log')
  })

  test('category page loads', async ({ page }) => {
    await page.goto('/frontier-models')
    await expect(page.locator('.doc-title')).toContainText('Frontier Models')
  })

  test('post page loads with content', async ({ page }) => {
    await page.goto('/frontier-models/comparando-gpt5-vs-claude-opus')
    await expect(page.locator('.doc-title')).toContainText('GPT-5')
    await expect(page.locator('.doc-body')).toBeVisible()
  })

  test('tag page loads', async ({ page }) => {
    await page.goto('/tags/claude')
    await expect(page.locator('.doc-title')).toContainText('claude')
  })

  test('RSS feed returns XML', async ({ page }) => {
    const response = await page.goto('/feed/pt.xml')
    expect(response?.headers()['content-type']).toContain('xml')
  })

  test('404 on non-existent page', async ({ page }) => {
    const response = await page.goto('/non-existent')
    expect(response?.status()).toBe(404)
  })

  test('sitemap returns valid XML', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.headers()['content-type']).toContain('xml')
  })
})

test.describe('Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const terminalBtn = page.locator('.status-clickable').filter({ hasText: 'Terminal' })
    if (await terminalBtn.isVisible()) {
      await terminalBtn.click()
    }
    await expect(page.locator('.terminal-panel')).toBeVisible()
  })

  async function waitForTypewriter(page: any) {
    await page.waitForTimeout(300)
  }

  test('ls command shows categories at root', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('ls')
    await input.press('Enter')
    await page.waitForTimeout(500)
    await expect(page.locator('.terminal-body')).toContainText('frontier-models')
  })

  test('cd command navigates to category', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('cd frontier-models')
    await input.press('Enter')
    await page.waitForURL('/frontier-models')
  })

  test('cd to non-existent category shows error', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('cd nonexistent')
    await input.press('Enter')
    await page.waitForTimeout(500)
    await expect(page.locator('.terminal-body')).toContainText('no such file or directory')
  })

  test('cat command opens a post', async ({ page }) => {
    await page.locator('.terminal-input').fill('cd frontier-models')
    await page.locator('.terminal-input').press('Enter')
    await page.waitForURL('/frontier-models')
    const input = page.locator('.terminal-input')
    await input.fill('cat comparando-gpt5-vs-claude-opus')
    await input.press('Enter')
    await page.waitForURL('/frontier-models/comparando-gpt5-vs-claude-opus')
  })

  test('pwd shows current path', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('pwd')
    await input.press('Enter')
    await page.waitForTimeout(500)
    await expect(page.locator('.terminal-body')).toContainText('/')
  })

  test('clear command clears terminal output', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('help')
    await input.press('Enter')
    await page.waitForTimeout(500)
    const before = page.locator('.terminal-line')
    await input.fill('clear')
    await input.press('Enter')
    await expect(page.locator('.terminal-body')).not.toContainText('help')
  })

  test('unknown command shows error', async ({ page }) => {
    const input = page.locator('.terminal-input')
    await input.fill('foobar')
    await input.press('Enter')
    await page.waitForTimeout(500)
    await expect(page.locator('.terminal-body')).toContainText('command not found')
  })
})

test.describe('Theme toggle', () => {
  test('theme toggles between light and dark', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')
    const themeBtn = page.locator('.activity-icons-bottom .activity-icon').first()
    await themeBtn.click()
    const newTheme = await html.getAttribute('data-theme')
    expect(newTheme).not.toBe(initialTheme)
  })

  test('theme persists in localStorage', async ({ page }) => {
    await page.goto('/')
    const themeBtn = page.locator('.activity-icons-bottom .activity-icon').first()
    await themeBtn.click()
    const theme = await page.evaluate(() => localStorage.getItem('context-log-store'))
    expect(theme).toContain('"theme"')
  })
})

test.describe('Sidebar', () => {
  test('folder expand/collapse works', async ({ page }) => {
    await page.goto('/')
    const folder = page.locator('.tree-folder-header').first()
    await folder.click()
    const contents = page.locator('.tree-folder-contents').first()
    await expect(contents).toBeHidden()
    await folder.click()
    await expect(contents).toBeVisible()
  })

  test('clicking a post navigates to it', async ({ page }) => {
    await page.goto('/')
    const postLink = page.locator('.tree-file').first()
    if (await postLink.isVisible()) {
      await postLink.click()
      await expect(page).not.toHaveURL('/')
    }
  })
})

test.describe('Language toggle', () => {
  test('language toggle visible in breadcrumbs', async ({ page }) => {
    await page.goto('/')
    const langToggle = page.locator('.lang-toggle')
    await expect(langToggle).toBeVisible()
    await expect(langToggle.locator('.active')).toContainText('pt')
  })
})

test.describe('Responsive', () => {
  test('mobile hides activity bar and sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('.activity-bar')).toBeHidden()
    await expect(page.locator('.sidebar')).toBeHidden()
  })
})
