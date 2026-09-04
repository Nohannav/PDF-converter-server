const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
  const errs=[];
  const p = await b.newPage({viewport:{width:1440,height:900}});
  p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/font|ERR_CONNECTION_RESET|404/.test(m.text()))errs.push(m.text())});
  await p.goto('http://localhost:8899/_test.html',{waitUntil:'load'}); await p.waitForTimeout(1600);
  await p.screenshot({path:'shots/n-intro.png'});
  await p.evaluate(()=>{const s=document.getElementById('introSkip'); s&&s.click();}); await p.waitForTimeout(1600);
  console.log('DIAG', JSON.stringify(await p.evaluate(()=>({
    triggers: ScrollTrigger.getAll().length, gl: document.getElementById('gl').classList.contains('is-live'),
    docH: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth>innerWidth,
    heroH: Math.round(document.querySelector('.hero').getBoundingClientRect().height),
    displayFont: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0]}))));
  const shots=[['hero',0],['proof',0.06],['vehicule',0.20],['bar',0.40],['mobilier',0.55],['anim',0.66],['galerie',0.76],['temo',0.85],['devis',0.96]];
  for (const [n,f] of shots){ await p.evaluate(v=>scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*v),f); await p.waitForTimeout(1100); await p.screenshot({path:`shots/n-${n}.png`}); }
  console.log(errs.length?'ERREURS:\n'+errs.join('\n'):'aucune erreur');
  await b.close();
})();
