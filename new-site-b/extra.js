/* ARÉVE — разделы «О нас», «Партнёрам», «Вопросы» на главной (общий файл для вариантов A и B).
   Армянский — оригинальные тексты старого areve.am (assets/areve-am/text/about.txt, architects.txt, faq.txt), сокращены.
   Русский и английский — перевод Claude. FAQ старый: гарантию и цифры подтвердить у владельца.
   Язык берётся из <html lang>, перерисовка — при его смене. */
(function () {
  'use strict';
  var X = {
    hy: {
      about_h: 'Մեր մասին',
      about: [
        'ԱՐԵՎԵ կազմակերպությունը մասնագիտացված է եվրոպական որակի պերգոլաների և մարկիզաների կառուցման գծով։',
        'Հենց պատվիրատուի պահանջների պարզաբանումից և նախագծի վրա աշխատանքից է սկսվում ծածկող շինությունների կառուցումը։ ԱՐԵՎԵ կազմակերպության անձնակազմը բաղկացած է որակավորված մասնագետներից, որոնք ունեն տվյալ շինությունների նախագծման մեծ փորձ։',
        'ԱՐԵՎԵ կազմակերպությունը կիրառում է միայն համաշխարհային լայն ճանաչում ունեցող եվրոպական արտադրողների կողմից արտադրվող և մատակարարվող բաղադրիչներ և նյութեր։'
      ],
      serv_h: 'Մեր ծառայությունները',
      serv: ['Նախագծում', '3D պատկերավորում', 'Տեղադրում', 'Կարգավորում', 'Մարկիզաների և պերգոլաների նորոգում'],
      part_h: 'Գործընկերներին',
      part_sub: 'Հրավիրում ենք համագործակցության դիզայներների, ճարտարապետների ու ճարտարապետական կազմակերպությունների։',
      arch_h: 'Ճարտարապետներին',
      arch: ['Պերգոլաների մոդելների լայն ընտրանի', 'Համագործակցության ձեռնտու պայմաններ', 'Որակավորված օգնություն նախագծման մեջ', 'Ուղևորում դեպի օբյեկտ', 'Համատեղ նախագծում արտադրողի ինժեներների ու ճարտարապետների հետ'],
      deal_h: 'Դիլերներին',
      deal: ['Արտադրանքի լայն տեսականի', 'Անձնակազմի ուսուցում', 'Պատվիրատուի հետ աշխատելու համար անհրաժեշտ տեղեկություններ', 'Աջակցություն նախագծման բոլոր փուլերում'],
      part_cta: 'Գրել WhatsApp-ով',
      faq_h: 'Հարցեր',
      faq: [
        ['Որքա՞ն արժե պերգոլայի քառակուսի մետրը։', 'Գինը կախված է ընտրած մոդելից, կառույցի նյութից՝ ալյումին, փայտ կամ մետաղ, և լրացուցիչ հատկություններից։ Այդ պատճառով տարբեր նախագծերի քառակուսի մետրի գները տարբեր են։'],
        ['Որտե՞ղ են տեղադրվում Four Seasons համակարգերը։', 'Ռեստորաններում, սրճարաններում, ակումբներում և մասնավոր տներում։'],
        ['Ինչպե՞ս են համակարգերը բացվում-փակվում։', 'Էլեկտրական շարժիչով՝ հեռակառավարման վահանակով։ Կա նաև ծրագիր՝ iPhone-ով և iPad-ով կառավարելու համար։'],
        ['Ինչի՞ց են պատրաստվում մարկիզաները։', 'Փեղկերը՝ փոշեներկված ալյումին, կցվող մասերը՝ մետաղ, կտավը՝ ակրիլ։'],
        ['Քամու ի՞նչ ուժին են դիմանում մարկիզաները։', 'Մինչև 50 կմ/ժ։'],
        ['Որքա՞ն են մարկիզաների առավելագույն չափերը։', 'Որոշ մոդելներ բացվում են մինչև 410 սմ։ Մեկ մարկիզայի լայնությունը՝ մինչև 700 սմ․ ավելի մեծ տարածքի համար կարելի է տեղադրել մի քանիսը կողք կողքի։'],
        ['Մեր տարածքը շատ մեծ է։', 'Մեծ տարածքների համար առաջարկում ենք բացվող ծածկով պերգոլաներ․ դրանք դիմանում են քամու 2 անգամ ավելի ուժին, քան մարկիզաները։'],
        ['Մարկիզաների կառավարման ի՞նչ տեսակներ կան։', 'Ձեռքի, էլեկտրական, հեռակառավարման և միասնական։ Միասնականի դեպքում հոսանքի բացակայության ժամանակ մարկիզան կարելի է բացել-փակել ձեռքով։'],
        ['Որքա՞ն է մարկիզաների երաշխիքը։', '5 տարի։ 2 տարի շահագործելուց հետո խորհուրդ ենք տալիս կանչել մասնագետին՝ ստուգման։ 5 տարի հետո կտավի և մասերի փոխումը՝ զեղչով։']
      ]
    },
    ru: {
      about_h: 'О нас',
      about: [
        'ARÉVE специализируется на проектировании и строительстве пергол и маркиз европейского качества.',
        'Работа начинается с того, что мы уточняем ваши требования и делаем проект. В команде — квалифицированные специалисты с большим опытом проектирования таких конструкций.',
        'Мы используем комплектующие и материалы европейских производителей с мировым именем.'
      ],
      serv_h: 'Наши услуги',
      serv: ['Проектирование', '3D-визуализация', 'Монтаж', 'Настройка', 'Ремонт маркиз и пергол'],
      part_h: 'Партнёрам',
      part_sub: 'Приглашаем к сотрудничеству дизайнеров, архитекторов и архитектурные бюро.',
      arch_h: 'Архитекторам',
      arch: ['Широкий выбор моделей пергол', 'Выгодные условия сотрудничества', 'Квалифицированная помощь в проектировании', 'Выезд на объект', 'Совместное проектирование с инженерами и архитекторами производителя'],
      deal_h: 'Дилерам',
      deal: ['Широкий ассортимент', 'Обучение персонала', 'Всё, что нужно для работы с заказчиком', 'Поддержка на всех этапах проекта'],
      part_cta: 'Написать в WhatsApp',
      faq_h: 'Вопросы',
      faq: [
        ['Сколько стоит квадратный метр перголы?', 'Цена зависит от модели, материала каркаса (алюминий, дерево или металл) и дополнительных опций. Поэтому у разных проектов цена за метр разная.'],
        ['Где ставят системы Four Seasons?', 'В ресторанах, кафе, клубах и частных домах.'],
        ['Как системы открываются и закрываются?', 'Электромотором с пульта. Есть и программа для управления с iPhone и iPad.'],
        ['Из чего делают маркизы?', 'Каркас — алюминий с порошковой покраской, крепёж — металл, ткань — акрил.'],
        ['Какой ветер выдерживают маркизы?', 'До 50 км/ч.'],
        ['Какие максимальные размеры маркиз?', 'Вынос у некоторых моделей — до 410 см. Ширина одной маркизы — до 700 см; для большего пространства ставят несколько рядом.'],
        ['У нас очень большая площадь.', 'Для больших площадей предлагаем перголы с раздвижной крышей — они выдерживают ветер в 2 раза сильнее, чем маркизы.'],
        ['Какое бывает управление маркизой?', 'Ручное, электрическое, с пульта и комбинированное. С комбинированным маркизу можно открыть и закрыть вручную, если нет электричества.'],
        ['Какая гарантия на маркизы?', '5 лет. Через 2 года советуем вызвать мастера на проверку. После 5 лет замена ткани и деталей — со скидкой.']
      ]
    },
    en: {
      about_h: 'About us',
      about: [
        'ARÉVE specialises in designing and building European-quality pergolas and awnings.',
        'Every project starts with understanding your requirements and drawing up a design. Our team are qualified specialists with long experience designing these structures.',
        'We use components and materials from well-known European manufacturers.'
      ],
      serv_h: 'Our services',
      serv: ['Design', '3D visualisation', 'Installation', 'Adjustment', 'Awning and pergola repair'],
      part_h: 'Partners',
      part_sub: 'We invite designers, architects and architecture studios to work with us.',
      arch_h: 'For architects',
      arch: ['A wide range of pergola models', 'Good partnership terms', 'Qualified help with design', 'Site visits', 'Joint design with the manufacturer’s engineers and architects'],
      deal_h: 'For dealers',
      deal: ['A wide product range', 'Staff training', 'Everything you need to work with clients', 'Support at every stage of a project'],
      part_cta: 'Message on WhatsApp',
      faq_h: 'FAQ',
      faq: [
        ['How much does a square metre of pergola cost?', 'It depends on the model, the frame material (aluminium, wood or metal) and the options. So the price per metre differs from project to project.'],
        ['Where are Four Seasons systems used?', 'In restaurants, cafés, clubs and private homes.'],
        ['How do the systems open and close?', 'With an electric motor and a remote. There is also an app to control them from an iPhone or iPad.'],
        ['What are the awnings made of?', 'Powder-coated aluminium frame, metal fittings, acrylic fabric.'],
        ['How much wind can awnings take?', 'Up to 50 km/h.'],
        ['What are the maximum awning sizes?', 'Some models extend up to 410 cm. One awning is up to 700 cm wide; for wider spaces several are fitted side by side.'],
        ['Our space is very large.', 'For large areas we suggest retractable-roof pergolas: they withstand twice the wind that awnings can.'],
        ['What controls are available?', 'Manual, electric, remote and combined. With combined control the awning can be opened by hand during a power cut.'],
        ['What is the awning warranty?', '5 years. We recommend a check-up by our technician after 2 years. After 5 years, fabric and parts are replaced at a discount.']
      ]
    }
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function li(a) { return a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join(''); }
  function render() {
    var l = document.documentElement.lang, t = X[l] || X.ru, el;
    if ((el = document.getElementById('x-about'))) el.innerHTML =
      '<div class="x-head"><h2>' + esc(t.about_h) + '</h2></div><div class="x-cols"><div class="x-text">' +
      t.about.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '</div><div class="x-card"><h3>' + esc(t.serv_h) + '</h3><ul class="x-list">' + li(t.serv) + '</ul></div></div>';
    if ((el = document.getElementById('x-partners'))) el.innerHTML =
      '<div class="x-head"><h2>' + esc(t.part_h) + '</h2><p>' + esc(t.part_sub) + '</p></div><div class="x-cols">' +
      '<div class="x-card"><h3>' + esc(t.arch_h) + '</h3><ul class="x-list">' + li(t.arch) + '</ul></div>' +
      '<div class="x-card"><h3>' + esc(t.deal_h) + '</h3><ul class="x-list">' + li(t.deal) + '</ul></div></div>' +
      '<p class="x-cta"><a class="x-btn" href="https://wa.me/37493700370" target="_blank" rel="noopener">' + esc(t.part_cta) + '</a></p>';
    if ((el = document.getElementById('x-faq'))) el.innerHTML =
      '<div class="x-head"><h2>' + esc(t.faq_h) + '</h2></div><div class="x-faq">' +
      t.faq.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div>';
  }
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
