/* ARÉVE — языки, меню, заявка в WhatsApp. Без сборки.
   Армянский текст написан Claude — вычитать носителю. Слоган — с areve.am.
   Основа заявки — areveFormWA() из site/site.js. */
(function () {
  'use strict';
  var WA = 'https://wa.me/37493700370';

  var T = {
    hy: {
      title: 'ARÉVE — Երևան', skip: 'Անցնել բովանդակությանը', menu: 'Մենյու', city: 'Երևան',
      n_home: 'Գլխավոր', n_about: 'Մեր մասին', n_products: 'Տեսականի', n_service: 'Ծառայություն', n_partners: 'Գործընկեր', n_work: 'Նմուշ', n_faq: 'Հարցեր', n_contact: 'Կապ',
      h1: 'Արտաքին միջավայրի ստեղծման արվեստ',
      lead: 'Նախագծում և տեղադրում ենք պերգոլաներ, մարկիզաներ, տեռասների ապակեպատում, տեռասային հատակ և անձրևանոցներ՝ տների, վիլլաների, ռեստորանների և սրճարանների համար։',
      call: 'Զանգահարել', works_btn: 'Մեր աշխատանքները',
      p_h: 'Տեսականի', p_sub: 'Ընտրեք, թե ինչ է պետք․ կօգնենք ընտրել մոդելը և չափը։',
      pergola: 'Պերգոլա', pergola_d: 'Ծածկ տեռասի վրա՝ ստվեր և պաշտպանություն անձրևից։ Տների և ռեստորանների համար։',
      awning: 'Մարկիզա', awning_d: 'Բացվող ծածկ պատուհանների, պատշգամբի կամ տեռասի վրա։',
      glazing: 'Ապակեպատում', glazing_d: 'Տեռասների և վերանդաների ապակեպատում՝ հարմար նաև ցուրտ եղանակին։',
      deck: 'Տեռասային հատակ', deck_d: 'Հատակ տեռասի, լողավազանի և այգու համար։',
      umbrella: 'Անձրևանոց', umbrella_d: 'Մեծ անձրևանոցներ սրճարանների և ամառային հարթակների համար։',
      carpet: 'Կարպետ', carpet_d: 'Տարբերակների մասին կպատմենք հեռախոսով կամ WhatsApp-ով։', nophoto: 'Լուսանկարը՝ շուտով',
      advice: 'Չգիտեմ, պետք է խորհրդատվություն',
      s_h: 'Ինչպես ենք աշխատում', s_sub: 'Գաղափարից մինչև սպասարկում՝ ամեն ինչ անում է մեկ թիմ։',
      s1: 'Նախագծում', s1_d: 'Քննարկում ենք խնդիրը և տեղը, ընտրում համակարգը և չափերը։',
      s2: '3D պատկերավորում', s2_d: 'Ցույց ենք տալիս, թե ինչպես է այն երևալու՝ մինչև աշխատանքների սկիզբը։',
      s3: 'Տեղադրում', s3_d: 'Տեղադրում ենք կառույցը և միացնում կառավարումը։',
      s4: 'Կարգավորում և նորոգում', s4_d: 'Կարգավորում, սպասարկում և նորոգում ենք մարկիզաներն ու պերգոլաները։',
      w_h: 'Մեր աշխատանքները', w_sub: 'ԱՐԵՎԵ-ի իրական օբյեկտներ Երևանում։', w_all: 'Բոլոր աշխատանքները',
      w1: 'Առանձնատուն լողավազանով', w1_s: 'Պերգոլա, ուղղահայաց էկրան',
      w2: 'Ռեստորան ջրի մոտ', w2_s: 'Սահող ծածկով պերգոլաներ',
      w3: 'Պերգոլաներ հանձնումից առաջ', w3_s: 'Պերգոլա',
      w4: 'Փողոցային սրճարան', w4_s: 'Անձրևանոցներ, մարկիզաներ',
      w5: 'Պերգոլա տանիքին', w5_s: 'Պերգոլա',
      w6: 'Սրահ ալիքների տակ', w6_s: 'Ալիքաձև կտորե առաստաղ',
      f_h: 'Հայտ', f_sub: 'Լրացրեք ձևը․ կբացվի WhatsApp-ը պատրաստի հաղորդագրությամբ։ Ուղարկեք այն, և մենք կպատասխանենք։',
      f_c1: 'Գինը կախված է մոդելից, նյութից և հավելյալ ընտրանքներից։', f_c2: 'Տեղի լուսանկարը կարող եք ուղարկել անմիջապես WhatsApp-ով։', f_c3: 'Կամ զանգահարեք՝',
      l_name: 'Անուն', l_phone: 'Հեռախոս', l_prod: 'Ինչ է պետք', l_where: 'Որտեղ', l_size: 'Չափը', l_msg: 'Մեկնաբանություն', opt: '(պարտադիր չէ)', size_ph: 'օրինակ՝ 5×4 մ',
      where_home: 'Առանձնատուն', where_rest: 'Ռեստորան կամ սրճարան', where_other: 'Այլ',
      send: 'Ուղարկել WhatsApp-ով', f_note: 'Ձևը ոչինչ չի պահում կայքում․ հաղորդագրությունը դուք եք ուղարկում WhatsApp-ից։',
      e_req: 'Նշեք անունը և հեռախոսը։', go: 'Բացել WhatsApp-ը պատրաստի հաղորդագրությամբ',
      m_head: 'Հայտ ARÉVE կայքից', m_obj: 'Օբյեկտ', m_prod: 'Ապրանք',
      c_h: 'Կապ', c_addr: 'Հասցե', c_tel: 'Հեռախոս', map: 'Բացել քարտեզում',
      addr: '0002, ք. Երևան, Եկմալյան 6, Բիզնես կենտրոն «Բիզնես Պալե», 2-րդ հարկ, 21 սենյակ',
      slogan: 'Արևն ու անձրևը մեր տարերքն են',
      a_hero: 'Պերգոլա ռեստորանի տեռասի վրա, Երևան', a_pergola: 'Պերգոլա ռեստորանի տեռասի վրա', a_awning: 'Մարկիզաներ ռեստորանի ճակատին', a_glazing: 'Ապակեպատ տեռաս', a_deck: 'Տեռաս այգով և հատակով', a_umbrella: 'Անձրևանոցներ փողոցային տեռասում'
    },
    ru: {
      title: 'ARÉVE — Ереван', skip: 'Перейти к содержанию', menu: 'Меню', city: 'Ереван',
      n_home: 'Главная', n_about: 'О нас', n_products: 'Ассортимент', n_service: 'Сервис', n_partners: 'Партнёрам', n_work: 'Наши работы', n_faq: 'Вопросы', n_contact: 'Контакты',
      h1: 'Искусство создания внешней среды',
      lead: 'Проектируем и устанавливаем перголы, маркизы, остекление террас, террасный пол и зонты — для домов, вилл, ресторанов и кафе.',
      call: 'Позвонить', works_btn: 'Наши работы',
      p_h: 'Ассортимент', p_sub: 'Выберите, что нужно, — поможем подобрать модель и размер.',
      pergola: 'Пергола', pergola_d: 'Навес над террасой: тень и защита от дождя. Для домов и ресторанов.',
      awning: 'Маркиза', awning_d: 'Выдвижной тент над окнами, балконом или террасой.',
      glazing: 'Остекление', glazing_d: 'Остекление террас и веранд, чтобы сидеть и в прохладную погоду.',
      deck: 'Террасный пол', deck_d: 'Настил для террасы, бассейна и сада.',
      umbrella: 'Зонты', umbrella_d: 'Большие зонты для кафе и летних площадок.',
      carpet: 'Ковровые покрытия', carpet_d: 'Расскажем о вариантах по телефону или в WhatsApp.', nophoto: 'Фото скоро',
      advice: 'Не знаю, нужна консультация',
      s_h: 'Как мы работаем', s_sub: 'От идеи до сервиса — всё делает одна команда.',
      s1: 'Проект', s1_d: 'Обсуждаем задачу и место, подбираем систему и размеры.',
      s2: '3D-визуализация', s2_d: 'Показываем, как это будет выглядеть, ещё до начала работ.',
      s3: 'Монтаж', s3_d: 'Устанавливаем конструкцию и подключаем управление.',
      s4: 'Настройка и ремонт', s4_d: 'Настраиваем, обслуживаем и ремонтируем маркизы и перголы.',
      w_h: 'Наши работы', w_sub: 'Реальные объекты ARÉVE в Ереване.', w_all: 'Все работы',
      w1: 'Дом с бассейном', w1_s: 'Пергола, вертикальный экран',
      w2: 'Ресторан у воды', w2_s: 'Перголы с раздвижной крышей',
      w3: 'Перголы перед сдачей', w3_s: 'Пергола',
      w4: 'Уличное кафе', w4_s: 'Зонты, маркизы',
      w5: 'Пергола на крыше', w5_s: 'Пергола',
      w6: 'Зал под волнами', w6_s: 'Волнообразный тканевый потолок',
      f_h: 'Заявка', f_sub: 'Заполните форму — откроется WhatsApp с готовым сообщением. Отправьте его, и мы ответим.',
      f_c1: 'Цена зависит от модели, материала и опций.', f_c2: 'Фото места можно сразу приложить в WhatsApp.', f_c3: 'Или позвоните:',
      l_name: 'Имя', l_phone: 'Телефон', l_prod: 'Что нужно', l_where: 'Где', l_size: 'Размер', l_msg: 'Комментарий', opt: '(необязательно)', size_ph: 'например, 5×4 м',
      where_home: 'Частный дом', where_rest: 'Ресторан или кафе', where_other: 'Другое',
      send: 'Отправить в WhatsApp', f_note: 'Форма ничего не хранит на сайте: сообщение вы отправляете сами из WhatsApp.',
      e_req: 'Укажите имя и телефон.', go: 'Открыть WhatsApp с готовым сообщением',
      m_head: 'Заявка с сайта ARÉVE', m_obj: 'Объект', m_prod: 'Продукт',
      c_h: 'Контакты', c_addr: 'Адрес', c_tel: 'Телефон', map: 'Открыть на карте',
      addr: '0002, Ереван, ул. Екмаляна 6, бизнес-центр «Бизнес Пале», 2 этаж, комната 21',
      slogan: 'Солнце и дождь — наша стихия',
      a_hero: 'Пергола над террасой ресторана, Ереван', a_pergola: 'Пергола над террасой ресторана', a_awning: 'Маркизы на фасаде ресторана', a_glazing: 'Остеклённая терраса', a_deck: 'Терраса с садом и настилом', a_umbrella: 'Зонты на уличной террасе'
    },
    en: {
      title: 'ARÉVE — Yerevan', skip: 'Skip to content', menu: 'Menu', city: 'Yerevan',
      n_home: 'Home', n_about: 'About', n_products: 'Products', n_service: 'Service', n_partners: 'Partners', n_work: 'Our work', n_faq: 'FAQ', n_contact: 'Contact',
      h1: 'The art of creating outdoor spaces',
      lead: 'We design and install pergolas, awnings, terrace glazing, decking and umbrellas for homes, villas, restaurants and cafés.',
      call: 'Call', works_btn: 'Our work',
      p_h: 'Products', p_sub: 'Pick what you need and we will help choose the model and size.',
      pergola: 'Pergola', pergola_d: 'A roof over the terrace for shade and rain cover. For homes and restaurants.',
      awning: 'Awning', awning_d: 'A retractable cover over windows, a balcony or a terrace.',
      glazing: 'Glazing', glazing_d: 'Glazing for terraces and verandas, so they work in cool weather too.',
      deck: 'Decking', deck_d: 'Flooring for terraces, poolsides and gardens.',
      umbrella: 'Umbrellas', umbrella_d: 'Large umbrellas for cafés and summer terraces.',
      carpet: 'Carpeting', carpet_d: 'Ask us about the options by phone or WhatsApp.', nophoto: 'Photo coming soon',
      advice: 'Not sure, I need advice',
      s_h: 'How we work', s_sub: 'One team from the first idea to aftercare.',
      s1: 'Design', s1_d: 'We discuss the task and the site, then choose the system and sizes.',
      s2: '3D visualisation', s2_d: 'You see how it will look before any work starts.',
      s3: 'Installation', s3_d: 'We install the structure and connect the controls.',
      s4: 'Adjustment and repair', s4_d: 'We adjust, service and repair awnings and pergolas.',
      w_h: 'Our work', w_sub: 'Real ARÉVE projects in Yerevan.', w_all: 'All projects',
      w1: 'House with a pool', w1_s: 'Pergola, vertical screen',
      w2: 'Restaurant by the water', w2_s: 'Retractable-roof pergolas',
      w3: 'Pergolas at handover', w3_s: 'Pergola',
      w4: 'Street café', w4_s: 'Umbrellas, awnings',
      w5: 'Rooftop pergola', w5_s: 'Pergola',
      w6: 'Hall under waves', w6_s: 'Wave-fold fabric ceiling',
      f_h: 'Request', f_sub: 'Fill in the form and WhatsApp opens with the message ready. Send it and we will reply.',
      f_c1: 'The price depends on the model, materials and options.', f_c2: 'You can attach a photo of the site right in WhatsApp.', f_c3: 'Or call:',
      l_name: 'Name', l_phone: 'Phone', l_prod: 'What you need', l_where: 'Where', l_size: 'Size', l_msg: 'Comment', opt: '(optional)', size_ph: 'e.g. 5×4 m',
      where_home: 'Private home', where_rest: 'Restaurant or café', where_other: 'Other',
      send: 'Send via WhatsApp', f_note: 'The form stores nothing on the site: you send the message yourself from WhatsApp.',
      e_req: 'Please enter your name and phone.', go: 'Open WhatsApp with the message',
      m_head: 'Request from the ARÉVE website', m_obj: 'Site', m_prod: 'Product',
      c_h: 'Contact', c_addr: 'Address', c_tel: 'Phone', map: 'Open in maps',
      addr: 'Business Palais business centre, 6 Yekmalyan St, 2nd floor, room 21, Yerevan 0002',
      slogan: 'Sun and rain are our element',
      a_hero: 'Pergola over a restaurant terrace, Yerevan', a_pergola: 'Pergola over a restaurant terrace', a_awning: 'Awnings on a restaurant façade', a_glazing: 'Glazed terrace', a_deck: 'Garden terrace with decking', a_umbrella: 'Umbrellas on a street terrace'
    }
  };

  var lang = 'hy';
  try { var s = localStorage.getItem('areve_lang'); if (T[s]) lang = s; } catch (e) {}

  function render() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.title = t.title;
    document.querySelectorAll('[data-t]').forEach(function (el) { var v = t[el.dataset.t]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-ph]').forEach(function (el) { el.placeholder = t[el.dataset.ph] || ''; });
    document.querySelectorAll('[data-alt]').forEach(function (el) { var k = el.dataset.alt; el.alt = t[k] || ''; });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang;
      try { localStorage.setItem('areve_lang', lang); } catch (e) {}
      render();
    });
  });
  render();

  /* меню на телефоне */
  var burger = document.querySelector('.burger'), menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); burger.focus(); }
  });

  /* заявка → WhatsApp (формат из NEW-SITE-BRIEF.md) */
  var form = document.getElementById('lead'), err = document.getElementById('f-err'), go = document.getElementById('f-go');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = T[lang], f = form.elements;
    var name = f.name.value.trim(), phone = f.phone.value.trim();
    if (!name || phone.replace(/\D/g, '').length < 6) {
      err.textContent = t.e_req; err.hidden = false;
      (name ? f.phone : f.name).focus();
      return;
    }
    err.hidden = true;
    var where = form.querySelector('input[name=where]:checked');
    var rows = [
      t.m_head,
      t.l_name + ': ' + name,
      t.l_phone + ': ' + phone,
      t.m_prod + ': ' + f.product.options[f.product.selectedIndex].text,
      t.m_obj + ': ' + (where ? where.closest('label').textContent.trim() : '')
    ];
    if (f.size.value.trim()) rows.push(t.l_size + ': ' + f.size.value.trim());
    if (f.msg.value.trim()) rows.push(t.l_msg + ': ' + f.msg.value.trim());
    var url = WA + '?text=' + encodeURIComponent(rows.join('\n'));
    go.href = url; go.hidden = false;
    var w = null;
    try { w = window.open(url, '_blank'); } catch (x) {}
    if (w) w.opener = null; else go.focus();
  });
  /* лента работ: стрелки */
  var rail = document.getElementById('rail');
  document.querySelectorAll('.arrow').forEach(function (b) {
    b.addEventListener('click', function () {
      var w = rail.querySelector('.slide').getBoundingClientRect().width + 14;
      rail.scrollBy({ left: w * Number(b.dataset.dir), behavior: 'smooth' });
    });
  });
})();
