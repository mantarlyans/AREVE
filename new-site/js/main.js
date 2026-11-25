/* ARÉVE — главная: язык, карточки, заявка в WhatsApp */
{
  const WA = 'https://wa.me/37493700370';
  const $ = s => document.querySelector(s);
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let lang = DEFAULT_LANG;
  try { const s = localStorage.getItem('areve_lang'); if (I18N[s]) lang = s; } catch (e) {}
  const t = k => (I18N[lang] && I18N[lang][k]) || I18N.ru[k] || '';

  const stripes = '<svg viewBox="0 0 60 40" aria-hidden="true"><g fill="currentColor"><rect y="0" width="60" height="6" rx="1"/><rect y="10" width="60" height="6" rx="1"/><rect y="20" width="60" height="6" rx="1"/></g><path d="M0 30q5 8 10 0t10 0 10 0 10 0 10 0 10 0" fill="none" stroke="currentColor" stroke-width="3"/></svg>';

  function renderProducts() {
    $('#productGrid').innerHTML = PRODUCTS.map(p => `
      <article class="card">
        ${p.img ? `<img src="${p.img}" alt="${esc(t(p.id))}" loading="lazy" width="800" height="600">` : `<div class="ph">${stripes}</div>`}
        <div class="card-b">
          <h3>${esc(t(p.id))}</h3>
          <p>${esc(t(p.id + '_d'))}</p>
          <a href="#contacts" data-product="${p.id}" class="more">${esc(t('more'))}</a>
        </div>
      </article>`).join('');
    const sel = $('#productSelect'), cur = sel.value;
    sel.innerHTML = PRODUCTS.map(p => `<option value="${p.id}">${esc(t(p.id))}</option>`).join('') +
      `<option value="unsure">${esc(t('p_unsure'))}</option>`;
    if (cur) sel.value = cur;
  }

  function renderSteps() {
    $('#steps').innerHTML = [1, 2, 3, 4].map(i => `<li><h3>${esc(t('s' + i))}</h3><p>${esc(t('s' + i + '_d'))}</p></li>`).join('');
  }

  function renderWorks() {
    $('#workGrid').innerHTML = WORKS.map(w => `
      <figure class="work">
        <img src="${w.img}" alt="${esc(w[lang] || w.ru)}" loading="lazy" width="900" height="675">
        <figcaption><b>${esc(w[lang] || w.ru)}</b>${w.name ? `<span>${esc(w.name)}</span>` : ''}</figcaption>
      </figure>`).join('');
  }

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(el => { const v = t(el.dataset.t); if (v) el.textContent = v; });
    document.querySelectorAll('[data-alt]').forEach(el => { el.alt = t(el.dataset.alt); });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    renderProducts(); renderSteps(); renderWorks();
  }

  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem('areve_lang', lang); } catch (e) {}
    render();
  }));

  /* меню на телефоне */
  const burger = $('.burger'), menu = $('#menu');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  });
  menu.addEventListener('click', e => {
    if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); }
  });

  /* страницы, которых ещё нет */
  let tm;
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-soon]');
    if (!a) return;
    e.preventDefault();
    const box = $('#toast');
    box.textContent = t('soon'); box.classList.add('on');
    clearTimeout(tm); tm = setTimeout(() => box.classList.remove('on'), 2200);
  });

  /* «Подробнее» на карточке → заявка с выбранным продуктом */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-product]');
    if (a) { const s = $('#productSelect'); if (s) s.value = a.dataset.product; }
  });

  /* заявка → WhatsApp */
  $('#leadForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, v = n => (f.elements[n].value || '').trim();
    const err = $('#formErr');
    if (!v('name') || !v('phone')) { err.hidden = false; (v('name') ? f.elements.phone : f.elements.name).focus(); return; }
    err.hidden = true;
    const sel = f.elements.product, obj = f.querySelector('input[name=object]:checked');
    const rows = [
      t('wa_head'),
      t('f_name') + ': ' + v('name'),
      t('f_phone') + ': ' + v('phone'),
      t('f_product') + ': ' + sel.options[sel.selectedIndex].text,
      t('f_object') + ': ' + t('o_' + obj.value)
    ];
    if (v('size')) rows.push(t('f_size') + ': ' + v('size'));
    if (v('comment')) rows.push(t('f_comment') + ': ' + v('comment'));
    const url = WA + '?text=' + encodeURIComponent(rows.join('\n'));
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* нижняя панель на телефоне — только после кнопок первого экрана, без дублей */
  const acts = document.querySelector('.hero .actions'), bar = $('.mbar');
  if (acts && bar && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('mbar-auto');
    new IntersectionObserver(en => bar.classList.toggle('show', !en[0].isIntersecting && en[0].boundingClientRect.top < 0)).observe(acts);
  }

  render();
}
