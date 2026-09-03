const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type()==='error') errors.push('CONSOLE: '+m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: '+e.message));
  page.on('requestfailed', r => errors.push('REQ FAIL: '+r.url().slice(0,90)));

  await page.goto('http://localhost:8899/_test.html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  const diag = await page.evaluate(() => ({
    gsap: typeof window.gsap, st: typeof window.ScrollTrigger,
    lenis: typeof window.Lenis, three: typeof window.THREE,
    docH: document.documentElement.scrollHeight,
    heroTitle: getComputedStyle(document.querySelector('.hero__title')).fontSize,
    glLive: document.getElementById('gl').classList.contains('is-live'),
    triggers: window.ScrollTrigger ? ScrollTrigger.getAll().length : 0,
  }));
  console.log('DIAG', JSON.stringify(diag, null, 1));

  const shots = [['hero',0],['manifeste',0.10],['vehicule',0.26],['mobilier',0.48],['animation',0.62],['galerie',0.72],['temoins',0.84],['devis',0.95]];
  for (const [name, frac] of shots) {
    await page.evaluate(f => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), frac);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `shots/d-${name}.png` });
  }
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile:true, hasTouch:true });
  await m.goto('http://localhost:8899/_test.html', { waitUntil: 'load' });
  await m.waitForTimeout(2000);
  for (const [name, frac] of [['hero',0],['vehicule',0.3],['mobilier',0.5],['devis',0.95]]) {
    await m.evaluate(f => window.scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*f), frac);
    await m.waitForTimeout(1200);
    await m.screenshot({ path: `shots/m-${name}.png` });
  }
  console.log(errors.length ? 'PROBLEMES:\n' + errors.join('\n') : 'Aucune erreur console/reseau');
  await browser.close();
})();
