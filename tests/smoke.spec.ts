import { expect, test } from '@playwright/test';

const themes = ['light', 'dark'] as const;
const motions = [false, true] as const;
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

for (const theme of themes) {
  for (const reduced of motions) {
    for (const viewport of viewports) {
      test(`content stays visible: ${theme}, motion ${reduced ? 'reduced' : 'on'}, ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.emulateMedia({
          colorScheme: theme,
          reducedMotion: reduced ? 'reduce' : 'no-preference',
        });
        await page.addInitScript(
          ({ theme: mode, reduced: reduce }) => {
            localStorage.setItem('mode', mode);
            localStorage.setItem('motion', reduce ? 'off' : 'on');
          },
          { theme, reduced },
        );
        await page.goto('/');
        const heading = page.getByRole('heading', { level: 1, name: /Juan Sebastián Mendoza/ });
        await expect(heading).toBeVisible();
        await expect(page.getByRole('link', { name: 'See the work' })).toBeVisible();
        const about = page.getByRole('heading', { name: 'Full-stack, with a front-end background.' });
        await expect(about).toBeVisible();
        const opacity = await about.evaluate((element) => {
          let node: HTMLElement | null = element as HTMLElement;
          let value = 1;
          while (node) {
            value *= Number(getComputedStyle(node).opacity);
            node = node.parentElement;
          }
          return value;
        });
        expect(opacity).toBeGreaterThan(0.9);
        if (!reduced) {
          await page.screenshot({
            path: `test-results/screenshots/home-${viewport.name}-${theme}-motion.png`,
            fullPage: false,
          });
        }
      });
    }
  }
}

test('copy email puts the address on the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  await page.locator('astro-island[component-url*="CopyEmail"]:not([ssr])').waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByText('Email copied.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hello@juansebastianmendoza.com');
});

test('copy email falls back when the Clipboard API is missing', async ({ page }) => {
  // Plain HTTP on a LAN address has no navigator.clipboard.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined });
  });
  await page.goto('/#contact');
  await page.locator('astro-island[component-url*="CopyEmail"]:not([ssr])').waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByText('Email copied.')).toBeVisible();
});

test('essay images and links render', async ({ page }) => {
  await page.goto('/blog/build-a-full-stack-crud-app-with-graphql-mongodb-nextjs-nextauth-and-typescript');
  const images = page.locator('.post-body img');
  expect(await images.count()).toBeGreaterThan(20);
  await expect(page.locator('.post-body')).not.toContainText('align=');
  await page.goto('/blog/introduction-to-react-router-and-single-page-applications');
  await expect(page.locator('.post-body a[href="#hashrouter"]')).toHaveCount(1);
});

test('page title leaves out the employer', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Juan Sebastián Mendoza · Software Engineer');
});

test('penalty game: shoot, score updates, Escape returns to the pitch', async ({ page }) => {
  await page.goto('/');
  await page.locator('astro-island[component-url*="PenaltyGame"]:not([ssr])').waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Take a penalty' }).click();
  await page.getByRole('button', { name: 'Shoot low left' }).click();
  await expect(page.locator('.penalty-call')).toHaveText(/./);
  await expect(page.locator('.penalty-hud')).toContainText('/1');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Take a penalty' })).toBeVisible();
});

test('lineup players open a position card', async ({ page }) => {
  await page.goto('/#lineup');
  const keeper = page.locator('.xi .player-btn[aria-controls="pos-GK"]');
  await keeper.click();
  await expect(keeper).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#pos-GK')).toContainText('Goalkeeper');
  await page.keyboard.press('Escape');
  await expect(page.locator('#pos-GK')).toBeHidden();
});

test('buttons show a pointer cursor', async ({ page }) => {
  await page.goto('/');
  const launch = page.getByRole('button', { name: 'Take a penalty' });
  expect(await launch.evaluate((element) => getComputedStyle(element).cursor)).toBe('pointer');
});

test('3D pitch loads on desktop and a click kicks the ball', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => localStorage.setItem('motion', 'on'));
  await page.goto('/');
  const pitch = page.locator('.pitch-3d');
  await pitch.locator('canvas').waitFor({ timeout: 15_000 });
  await expect(page.locator('.hero-stage')).toHaveClass(/has-3d/);
  const box = await pitch.boundingBox();
  if (!box) throw new Error('3D pitch has no size');
  await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.3);
  await expect(page.locator('.pitch-3d-hint')).toHaveClass(/is-faded/);
});
