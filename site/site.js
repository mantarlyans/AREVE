/* ARÉVE — общий код страниц: шапка, языки, мобильное меню, подбор системы (<dialog>), плавающая связь,
   курсор, плавная прокрутка (Lenis, если загружен), «сейчас в Ереване».
   ⚠️ Армянский текст написан Claude — вычитать носителю. */
const NAV = {
  hy:{navColl:'Տեսականի',navSpaces:'Տարածքներ',navProj:'Աշխատանքներ',navStudio:'3D ստուդիա',navProc:'Ինչպես ենք աշխատում',navArch:'Ճարտարապետներին',navContact:'Կապ',cta3d:'Պատվիրել 3D նախագիծ',foot:'Արտաքին միջավայրի ստեղծման արվեստ'},
  ru:{navColl:'Коллекция',navSpaces:'Пространства',navProj:'Наши работы',navStudio:'3D-студия',navProc:'Как мы работаем',navArch:'Архитекторам',navContact:'Контакты',cta3d:'Заказать 3D-проект',foot:'Искусство создания внешней среды'},
  en:{navColl:'Collection',navSpaces:'Spaces',navProj:'Our work',navStudio:'3D studio',navProc:'How we work',navArch:'Architects',navContact:'Contact',cta3d:'Request a 3D design',foot:'The art of outdoor space'}
};
const LINKS = [['collection.html','navColl'],['projects.html','navProj'],['studio.html','navStudio'],['architects.html','navArch'],['contact.html','navContact']];
const PHONE = '+374 93 70 03 70', WA = 'https://wa.me/37493700370';

/* заявка → WhatsApp ARÉVE: собираем подписи и значения полей формы (.fld) в текст и открываем чат.
   Сервер не нужен: сообщение отправляет сам клиент кнопкой «Отправить» в WhatsApp. */
function areveFormWA(form, title){
  const rows = [];
  form.querySelectorAll('.fld').forEach(f => {
    const lab = f.querySelector('label'); if (!lab) return;
    const radio = f.querySelector('input[type=radio]:checked'), sel = f.querySelector('select'), file = f.querySelector('input[type=file]');
    const inp = f.querySelector('input:not([type=radio]):not([type=file]), textarea');
    let v = '';
    if (radio) v = radio.closest('label').textContent.trim();
    else if (sel) v = sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text : '';
    else if (file) v = [...file.files].map(x => x.name).join(', ');
    else if (inp) v = inp.value.trim();
    if (v) rows.push(lab.textContent.trim() + ': ' + v);
  });
  const text = ['ARÉVE · ' + (title || (document.querySelector('h1') || {}).textContent || document.title), ...rows, location.href].join('\n');
  const url = WA + '?text=' + encodeURIComponent(text);
  const w = window.open(url, '_blank');
  if (w) w.opener = null; else location.href = url;
}

function areveHeader(current){
  return `<header class="top"><div class="wrap">
    <a class="logo" href="index.html" aria-label="ARÉVE"><svg viewBox="0 0 26 26" fill="none" stroke="#D8BC8E" stroke-width="1.1"><circle cx="13" cy="15" r="5"/><path d="M2 10.5h22M4 7.5h18M7 4.5h12"/></svg><b>ARÉVE</b></a>
    <nav class="main" aria-label="Main">${LINKS.map(([h, k]) => `<a href="${h}" data-t="${k}"${h === current ? ' aria-current="page"' : ''}></a>`).join('')}</nav>
    <div class="langs" role="group" aria-label="Language">
      <button type="button" data-lang="hy">ՀԱՅ</button><button type="button" data-lang="ru">РУС</button><button type="button" data-lang="en">ENG</button>
    </div></div></header>`;
}
function areveLang(){ try { const s = localStorage.getItem('areve_lang'); if (NAV[s]) return s; } catch (e) {} return 'hy'; }
function areveInit(current, T, onRender){
  document.body.insertAdjacentHTML('afterbegin', areveHeader(current));
  document.body.insertAdjacentHTML('beforeend', `<footer><div class="wrap"><span>© ARÉVE LLC · Yerevan</span><span data-t="foot"></span></div></footer>`);
  let lang = areveLang();
  function render(){
    const t = Object.assign({}, NAV[lang], T[lang]);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(el => { const v = t[el.dataset.t]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    onRender(lang, t);
  }
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang; try { localStorage.setItem('areve_lang', lang); } catch (e) {} render();
  }));
  render();
  areveEnhance();
}

/* время и дата в Ереване сейчас */
function areveNow(){
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Yerevan', hour: 'numeric', minute: 'numeric', month: 'numeric', day: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const g = k => +parts.find(p => p.type === k).value;
  const m = g('month'), d = g('day');
  const doy = Math.round((Date.UTC(2026, m - 1, d) - Date.UTC(2026, 0, 0)) / 864e5);
  return { hour: g('hour') + g('minute') / 60, doy };
}

/* ── подбор системы, меню, связь ── */
const UI = {
 hy:{menu:'Մենյու',close:'Փակել',pick:'Ընտրել համակարգը',wa:'WhatsApp',call:'Զանգ',
  q:['Ո՞րտեղ է ձեր տարածքը','Ի՞նչն է ամենակարևորը','Ե՞րբ եք պլանավորում'],
  sp:['Առանձնատուն','Ռեստորան','Տեռաս կամ տանիք','Լողավազան','Ձմեռային այգի'],
  need:['Ստվեր արևից','Պաշտպանություն անձրևից','Զովություն շոգին','Օգտագործել ձմռանը'],
  when:['Այս ամառ','Այս տարի','Դեռ պլանավորում եմ'],
  back:'Հետ',step:'Քայլ',resH:'Մեր առաջարկը',resP:'Սրանից կսկսեինք։ Ճշգրիտ ընտրությունը՝ չափագրումից և 3D նախագծից հետո։',again:'Նորից'},
 ru:{menu:'Меню',close:'Закрыть',pick:'Подобрать систему',wa:'WhatsApp',call:'Позвонить',
  q:['Где ваше пространство?','Что важнее всего?','Когда планируете?'],
  sp:['Частный дом','Ресторан','Терраса или крыша','Бассейн','Зимний сад'],
  need:['Тень от солнца','Защита от дождя','Прохлада в жару','Пользоваться зимой'],
  when:['Этим летом','В этом году','Пока планирую'],
  back:'Назад',step:'Шаг',resH:'Наше предложение',resP:'С этого мы бы начали. Точный выбор — после замера и 3D-проекта.',again:'Заново'},
 en:{menu:'Menu',close:'Close',pick:'Find your system',wa:'WhatsApp',call:'Call',
  q:['Where is your space?','What matters most?','When are you planning?'],
  sp:['Private home','Restaurant','Terrace or roof','Pool','Winter garden'],
  need:['Shade from the sun','Shelter from rain','Cooling in the heat','Use it in winter'],
  when:['This summer','This year','Just planning'],
  back:'Back',step:'Step',resH:'Our suggestion',resP:'This is where we would start. The final choice comes after measuring and the 3D design.',again:'Start over'}
};
const FAMS = {
 pergola:{href:'product.html#pergola',img:'villa',hy:'Պերգոլա',ru:'Пергола',en:'Pergola'},
 awning:{href:'product.html#awning',img:'awning-detail',hy:'Մարկիզա',ru:'Маркиза',en:'Awning'},
 glazing:{href:'product.html#glazing',img:'glazing',hy:'Ապակեպատում',ru:'Остекление',en:'Glazing'},
 deck:{href:'product.html#deck',img:'deck',hy:'Դեկինգ',ru:'Декинг',en:'Decking'},
 umbrella:{href:'product.html#umbrella',img:'umbrella',hy:'Անձրևանոց',ru:'Зонты',en:'Umbrellas'},
 screen:{href:'product.html#screen',img:'work/w015',hy:'Արտաքին էկրան',ru:'Уличный экран',en:'Outdoor screen'},
 wgshade:{href:'product.html#wgshade',img:'work/w090',hy:'Ձմեռային այգու վարագույր',ru:'Шторы для зимнего сада',en:'Winter garden shading'},
 mist:{href:'product.html#mist',img:'sail',hy:'Մառախուղ',ru:'Туманное охлаждение',en:'Misting'}
};
function areveRecommend(space, need){
  let r = [['pergola','awning'],['pergola','glazing'],['mist','pergola'],['glazing','pergola']][need].slice();
  if (space === 3) { r = r.map(x => x === 'awning' ? 'umbrella' : x); r.push('deck'); }
  if ((space === 0 || space === 3) && need === 0) r.splice(1, 0, 'screen');
  if (space === 4 && need === 0) r.splice(1, 0, 'wgshade');
  if (space === 4 && r[0] !== 'glazing') r.unshift('glazing');
  if (space === 2) r.push(need === 0 ? 'mist' : 'deck');
  if (space === 1 && need === 0) r.push('mist');
  if (space === 0) r.push('deck');
  return [...new Set(r)].slice(0, 3);
}

function areveEnhance(){
  if (window.__areveEnh) return; window.__areveEnh = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L = () => (NAV[document.documentElement.lang] ? document.documentElement.lang : areveLang());
  const top = document.querySelector('.top .wrap');

  /* мобильное меню */
  const burger = document.createElement('button');
  burger.type = 'button'; burger.className = 'burger'; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-controls', 'mnu');
  burger.innerHTML = '<span></span><span></span>';
  burger.setAttribute('aria-label', UI[L()].menu);
  if (top) top.appendChild(burger);
  const menu = document.createElement('div');
  menu.className = 'menu-ov'; menu.id = 'mnu'; menu.hidden = true;
  document.body.appendChild(menu);
  function fillMenu(){
    const links = [...document.querySelectorAll('nav.main a')];
    menu.innerHTML = `<nav>${links.map((a, i) => `<a href="${a.getAttribute('href')}" style="--i:${i}"><span class="mono">0${i + 1}</span>${a.textContent}</a>`).join('')}</nav>
      <div class="menu-foot"><button type="button" class="btn" data-quiz>${UI[L()].pick}</button><span class="mono">${PHONE} · info@areve.am</span></div>`;
  }
  function setMenu(open){
    if (open) fillMenu();
    menu.hidden = !open; burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? UI[L()].close : UI[L()].menu);
    document.documentElement.classList.toggle('menu-open', open);
  }
  burger.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  /* плавающая связь */
  const dock = document.createElement('div');
  dock.className = 'dock';
  document.body.appendChild(dock);
  function fillDock(){
    const u = UI[L()];
    dock.innerHTML = `<button type="button" class="dock-pick" data-quiz><svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="13" cy="15" r="5"/><path d="M2 10.5h22M4 7.5h18M7 4.5h12"/></svg><span>${u.pick}</span></button>
      <a class="dock-wa" href="${WA}" target="_blank" rel="noopener" aria-label="${u.wa} ${PHONE}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg></a>`;
  }

  /* подбор системы: нативный <dialog> */
  const dlg = document.createElement('dialog');
  dlg.className = 'quiz';
  document.body.appendChild(dlg);
  let qs = { step: 0, a: [] };
  function drawQuiz(){
    const u = UI[L()], lang = L();
    const opts = [u.sp, u.need, u.when];
    if (qs.step < 3) {
      dlg.innerHTML = `<form method="dialog" class="q-close"><button aria-label="${u.close}">✕</button></form>
        <span class="mono q-step">${u.step} 0${qs.step + 1} / 03</span>
        <div class="q-bar"><i style="width:${(qs.step) / 3 * 100}%"></i></div>
        <h2>${u.q[qs.step]}</h2>
        <div class="q-opts">${opts[qs.step].map((o, i) => `<button type="button" data-a="${i}"${qs.a[qs.step] === i ? ' aria-pressed="true"' : ''}>${o}</button>`).join('')}</div>
        ${qs.step ? `<button type="button" class="q-back" data-back>← ${u.back}</button>` : ''}`;
    } else {
      const rec = areveRecommend(qs.a[0], qs.a[1]);
      dlg.innerHTML = `<form method="dialog" class="q-close"><button aria-label="${u.close}">✕</button></form>
        <span class="mono q-step">${u.sp[qs.a[0]]} · ${u.need[qs.a[1]]} · ${u.when[qs.a[2]]}</span>
        <div class="q-bar"><i style="width:100%"></i></div>
        <h2>${u.resH}</h2><p class="q-p">${u.resP}</p>
        <div class="q-res">${rec.map((k, i) => `<a href="${FAMS[k].href}"><img src="img/${FAMS[k].img}.jpg" alt="" loading="lazy"><span class="mono">0${i + 1}</span><b>${FAMS[k][lang]}</b></a>`).join('')}</div>
        <div class="q-cta"><a class="btn" href="index.html#request">${NAV[lang].cta3d}</a><button type="button" class="btn ghost" data-again>${u.again}</button></div>`;
    }
  }
  dlg.addEventListener('click', e => {
    const a = e.target.closest('[data-a]');
    if (a) { qs.a[qs.step] = +a.dataset.a; qs.step++; drawQuiz(); try { sessionStorage.setItem('areve_quiz', JSON.stringify(qs.a)); } catch (er) {} return; }
    if (e.target.closest('[data-back]')) { qs.step--; drawQuiz(); return; }
    if (e.target.closest('[data-again]')) { qs = { step: 0, a: [] }; drawQuiz(); return; }
    if (e.target.closest('.q-res a, .q-cta a')) dlg.close();
    if (e.target === dlg) dlg.close();
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-quiz]')) return;
    setMenu(false); qs = { step: 0, a: [] }; drawQuiz();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  });

  /* перерисовка подписей при смене языка (любая страница, включая главную) */
  fillDock();
  new MutationObserver(() => { fillDock(); if (!menu.hidden) fillMenu(); if (dlg.open) drawQuiz(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  /* курсор: бронзовое кольцо, только мышь */
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    const c = document.createElement('div'); c.className = 'cursor'; document.body.appendChild(c);
    let x = -100, y = -100, cx = x, cy = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); }, { passive: true });
    document.addEventListener('pointerleave', () => c.classList.remove('on'));
    document.addEventListener('pointerover', e => c.classList.toggle('big', !!e.target.closest('a,button,input,select,label,.scene3d')));
    (function loop(){ cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  }

  /* живой свет: свечение на тёмных первых экранах стоит там, где сейчас солнце над Ереваном */
  try {
    const n = areveNow(), up = n.hour > 6 && n.hour < 20;
    const x = Math.max(5, Math.min(95, (n.hour - 6) / 14 * 100));
    const a = up ? Math.sin((n.hour - 6) / 14 * Math.PI) : 0;
    document.documentElement.style.setProperty('--sun-x', (100 - x) + '%');
    document.documentElement.style.setProperty('--sun-a', (.35 + a * .65).toFixed(2));
  } catch (e) {}

  /* кнопки-магниты */
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    document.addEventListener('pointermove', e => {
      const b = e.target.closest('.btn,.dock-pick'); 
      document.querySelectorAll('.btn.mag').forEach(x => { if (x !== b) { x.style.transform = ''; x.classList.remove('mag'); } });
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.classList.add('mag');
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`;
    }, { passive: true });
  }

  /* Motion (motion.dev, ванильная сборка): появление разделов, параллакс фото. Без Motion и при «уменьшить движение» — статично */
  if (window.Motion && !reduce) {
    const { animate, inView, scroll, stagger } = Motion;
    const groups = ['.steps,.stepz', '.slots', '.files', '.list', '.reg', '.combo-grid', '.next-grid', '.q-res', '#collList', '.tech', '.pages', '#index', '.cgrid', '.specs .wrap', '.arch ul', '#arList', '.mode-list', '.shoot ol'];
    document.querySelectorAll(groups.join(',')).forEach(g => {
      inView(g, () => { const kids = [...g.children].filter(k => k.offsetParent); if (kids.length) animate(kids, { opacity: [0, 1], y: [26, 0] }, { duration: .7, delay: stagger(.07), easing: [.2, .7, .2, 1] }); }, { amount: .15 });
    });
    document.querySelectorAll('.sec-head,.head,.grid-head,.top-row,.space .wrap>div,.models .wrap>div:first-child,.where .wrap>div,.req .wrap>div:first-child,.terms .wrap>div:first-child,.flow h2,.ask .wrap>div:first-child').forEach(el => {
      inView(el, () => { animate(el, { opacity: [0, 1], y: [34, 0] }, { duration: .8, easing: [.2, .7, .2, 1] }); }, { amount: .3 });
    });
    /* параллакс: фото медленно смещаются внутри своих рамок */
    document.querySelectorAll('.space figure img,.spaces .space img,.hero-img img,.p-hero img,.render img').forEach(img => {
      const box = img.closest('figure,section,div');
      img.style.willChange = 'transform';
      scroll(animate(img, { y: ['-6%', '6%'], scale: [1.12, 1.12] }, { easing: 'linear' }), { target: box, offset: ['start end', 'end start'] });
    });
  }

  /* просмотр фото: ссылки с data-lb открывают снимок во весь экран; data-lb-group — листать соседние */
  const lbx = document.createElement('dialog'); lbx.className = 'lbx';
  lbx.innerHTML = '<img alt=""><button type="button" class="lb-x" aria-label="Close">✕</button><button type="button" class="lb-p" aria-label="Previous">‹</button><button type="button" class="lb-n" aria-label="Next">›</button><span class="lb-c mono"></span>';
  document.body.appendChild(lbx);
  let lbList = [], lbI = 0;
  const lbShow = () => { const a = lbList[lbI]; lbx.querySelector('img').src = a.getAttribute('href'); lbx.querySelector('img').alt = a.dataset.lb || ''; lbx.querySelector('.lb-c').textContent = (lbI + 1) + ' / ' + lbList.length + (a.dataset.lb ? ' · ' + a.dataset.lb : ''); };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-lb]'); if (!a) return;
    e.preventDefault();
    const g = a.dataset.lbGroup; lbList = g ? [...document.querySelectorAll(`a[data-lb-group="${g}"]`)] : [a]; lbI = Math.max(0, lbList.indexOf(a));
    lbShow(); if (lbx.showModal) lbx.showModal(); else lbx.setAttribute('open', '');
  });
  lbx.addEventListener('click', e => {
    if (e.target.closest('.lb-p')) { lbI = (lbI - 1 + lbList.length) % lbList.length; lbShow(); }
    else if (e.target.closest('.lb-n')) { lbI = (lbI + 1) % lbList.length; lbShow(); }
    else if (e.target.closest('.lb-x') || e.target === lbx) lbx.close();
  });
  lbx.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') lbx.querySelector('.lb-p').click(); if (e.key === 'ArrowRight') lbx.querySelector('.lb-n').click(); });
  let tx = 0; lbx.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lbx.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) lbx.querySelector(d > 0 ? '.lb-p' : '.lb-n').click(); });

  /* якоря при <base href> (сайт в подпапке): «#раздел» — прокрутка по этой странице, а не переход на главную */
  if (document.querySelector('base')) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute('href').slice(1), el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault(); e.stopImmediatePropagation();
      history.replaceState(null, '', location.pathname + '#' + id);
      if (window.areveLenis) window.areveLenis.scrollTo(el, { offset: -76 });
      else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }, true);
  }

  /* плавная прокрутка */
  if (window.Lenis && !reduce) {
    try {
      const lenis = new Lenis({ lerp: .1, smoothWheel: true });
      (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
      document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute('href').length < 2) return;
        const el = document.querySelector(a.getAttribute('href')); if (!el) return;
        e.preventDefault(); lenis.scrollTo(el, { offset: -76 });
      });
      window.areveLenis = lenis;
    } catch (e) {}
  }
}

/* плавная смена превью: Motion, если есть; иначе — CSS-переход */
function areveSwap(img, src){
  const M = window.Motion, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!M || reduce) { img.src = src; return; }
  M.animate(img, { opacity: 0, scale: 1.03 }, { duration: .22 }).then(() => {
    img.onload = () => M.animate(img, { opacity: [0, 1], scale: [1.06, 1] }, { duration: .7, easing: [.2, .7, .2, 1] });
    img.src = src;
  });
}
