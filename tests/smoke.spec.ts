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
            path: `docs/screenshots/home-${viewport.name}-${theme}-motion.png`,
            fullPage: false,
          });
        }
      });
    }
  }
}

test('stadium ambience produces a signal', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turn stadium ambience on' }).click();
  await page.waitForTimeout(700);
  const rms = await page.evaluate(() => {
    const analyser = (window as unknown as { __ambienceAnalyser?: AnalyserNode }).__ambienceAnalyser;
    if (!analyser) return 0;
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    let sum = 0;
    for (const sample of data) sum += sample * sample;
    return Math.sqrt(sum / data.length);
  });
  expect(rms).toBeGreaterThan(0.02);
});
