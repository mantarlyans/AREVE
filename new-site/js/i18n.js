/* ARÉVE — тексты сайта.
   ru — основной черновик (написан Claude, факты из PROMPT.md).
   hy и en — полностью (25.11.2026). Армянский написан Claude — вычитать носителю. */

const DEFAULT_LANG = 'hy';

const I18N = {
  ru: {
    skip: 'К содержанию', menu: 'Меню', soon: 'Страница в работе',
    nav_about: 'О нас', nav_products: 'Ассортимент', nav_service: 'Сервис', nav_partners: 'Партнёрам',
    nav_works: 'Наши работы', nav_faq: 'Вопросы', nav_contacts: 'Контакты',
    hero_title: 'Искусство создания внешней среды',
    hero_sub: 'Перголы, маркизы, остекление и террасный пол для домов, ресторанов и кафе. Проект, 3D, монтаж и сервис — в Ереване.',
    alt_hero: 'Терраса с перголой и подсветкой вечером — объект ARÉVE в Ереване',
    btn_call: 'Позвонить', btn_works: 'Наши работы',
    products_title: 'Ассортимент', more: 'Оставить заявку',
    pergola: 'Перголы', pergola_d: 'Лёгкая конструкция, которая даёт тень на террасе, во дворе или на балконе.',
    awning: 'Маркизы', awning_d: 'Выдвижной тент над террасой, окном или витриной. Управление ручное, электрическое или с пульта.',
    glazing: 'Остекление', glazing_d: 'Остекление террас и веранд, в том числе вместе с перголой.',
    deck: 'Террасный пол', deck_d: 'Настил для террас, у бассейна и в саду.',
    umbrella: 'Зонты', umbrella_d: 'Большие зонты для летних террас кафе и ресторанов.',
    carpet: 'Ковровые покрытия', carpet_d: 'Расскажем подробно по телефону или в WhatsApp.',
    process_title: 'Как мы работаем',
    s1: 'Проектирование', s1_d: 'Подбираем модель, размеры и материалы под ваш объект.',
    s2: '3D-визуализация', s2_d: 'Показываем, как конструкция будет выглядеть у вас, ещё до монтажа.',
    s3: 'Монтаж и настройка', s3_d: 'Устанавливаем конструкцию и настраиваем все механизмы.',
    s4: 'Сервис', s4_d: 'Ремонт маркиз и пергол. Гарантия на маркизы — 5 лет.',
    works_title: 'Наши работы', works_all: 'Все работы',
    form_title: 'Оставьте заявку',
    form_sub: 'Ответим в WhatsApp. Цена зависит от модели, материала и опций — посчитаем под ваш объект.',
    f_name: 'Имя', f_phone: 'Телефон', f_product: 'Что нужно', f_object: 'Объект',
    o_home: 'Частный дом', o_rest: 'Ресторан, кафе', o_other: 'Другое',
    f_size: 'Размер, если знаете', f_comment: 'Комментарий',
    f_err: 'Укажите имя и телефон.', f_send: 'Отправить в WhatsApp',
    f_note: 'Откроется WhatsApp с готовым текстом — останется нажать «Отправить».',
    p_unsure: 'Пока не знаю — нужна консультация',
    wa_head: 'Заявка с сайта ARÉVE',
    contacts_title: 'Контакты',
    address: '0002, Ереван, ул. Екмалян 6, бизнес-центр «Бизнес Пале», 2 этаж, комната 21',
    map: 'Открыть на карте', slogan: 'Солнце и дождь — наша стихия!'
  },
  /* hy — написан Claude (кроме слогана, адреса и названий меню/продуктов со старого areve.am): вычитать носителю */
  hy: {
    skip: 'Անցնել բովանդակությանը', menu: 'Մենյու', soon: 'Էջը պատրաստվում է',
    nav_about: 'Մեր մասին', nav_products: 'Տեսականի', nav_service: 'Ծառայություն', nav_partners: 'Գործընկեր',
    nav_works: 'Նմուշ', nav_faq: 'Հարցեր', nav_contacts: 'Կապ',
    hero_title: 'Արտաքին միջավայրի ստեղծման արվեստ',
    hero_sub: 'Պերգոլաներ, մարկիզաներ, ապակեպատում և տեռասային հատակ՝ տների, ռեստորանների և սրճարանների համար։ Նախագիծ, 3D, տեղադրում և սպասարկում Երևանում։',
    alt_hero: 'Տեռաս պերգոլայով և լուսավորությամբ երեկոյան՝ ԱՐԵՎԵ-ի օբյեկտ Երևանում',
    btn_call: 'Զանգահարել', btn_works: 'Մեր աշխատանքները',
    products_title: 'Տեսականի', more: 'Թողնել հայտ',
    pergola: 'Պերգոլա', pergola_d: 'Թեթև կառույց, որը ստվեր է տալիս տեռասում, բակում կամ պատշգամբում։',
    awning: 'Մարկիզա', awning_d: 'Բացվող ծածկ տեռասի, պատուհանի կամ ցուցափեղկի վրա։ Կառավարումը՝ ձեռքով, էլեկտրական կամ հեռակառավարմամբ։',
    glazing: 'Ապակեպատում', glazing_d: 'Տեռասների և վերանդաների ապակեպատում, այդ թվում՝ պերգոլայի հետ միասին։',
    deck: 'Տեռասային հատակ', deck_d: 'Հատակ տեռասների, լողավազանի և այգու համար։',
    umbrella: 'Անձրևանոց', umbrella_d: 'Մեծ անձրևանոցներ սրճարանների և ռեստորանների ամառային տեռասների համար։',
    carpet: 'Կարպետ', carpet_d: 'Մանրամասն կպատմենք հեռախոսով կամ WhatsApp-ով։',
    process_title: 'Ինչպես ենք աշխատում',
    s1: 'Նախագծում', s1_d: 'Ընտրում ենք մոդելը, չափերը և նյութերը ձեր օբյեկտի համար։',
    s2: '3D պատկերավորում', s2_d: 'Ցույց ենք տալիս, թե ինչպես կերևա կառույցը՝ դեռ մինչև տեղադրումը։',
    s3: 'Տեղադրում և կարգավորում', s3_d: 'Տեղադրում ենք կառույցը և կարգավորում բոլոր մեխանիզմները։',
    s4: 'Սպասարկում', s4_d: 'Մարկիզաների և պերգոլաների նորոգում։ Մարկիզաների երաշխիքը՝ 5 տարի։',
    works_title: 'Մեր աշխատանքները', works_all: 'Բոլոր աշխատանքները',
    form_title: 'Թողեք հայտ',
    form_sub: 'Կպատասխանենք WhatsApp-ով։ Գինը կախված է մոդելից, նյութից և ընտրանքներից՝ կհաշվարկենք ձեր օբյեկտի համար։',
    f_name: 'Անուն', f_phone: 'Հեռախոս', f_product: 'Ինչ է պետք', f_object: 'Օբյեկտ',
    o_home: 'Առանձնատուն', o_rest: 'Ռեստորան, սրճարան', o_other: 'Այլ',
    f_size: 'Չափը, եթե գիտեք', f_comment: 'Մեկնաբանություն',
    f_err: 'Նշեք անունը և հեռախոսը։', f_send: 'Ուղարկել WhatsApp-ով',
    f_note: 'Կբացվի WhatsApp-ը պատրաստի տեքստով․ մնում է սեղմել «Ուղարկել»։',
    p_unsure: 'Դեռ չգիտեմ, պետք է խորհրդատվություն',
    wa_head: 'Հայտ ARÉVE կայքից',
    contacts_title: 'Կապ',
    address: '0002, ք. Երևան, Եկմալյան 6, Բիզնես Կենտրոն «Բիզնես Պալե», 2-րդ հարկ, 21 սենյակ',
    map: 'Բացել քարտեզում', slogan: 'ԱՐԵՎՆ ՈՒ ԱՆՁՐԵՎԸ ՄԵՐ ՏԱՐԵՐՔՆ ԵՆ'
  },
  /* en — перевод Claude */
  en: {
    skip: 'Skip to content', menu: 'Menu', soon: 'Page in progress',
    nav_about: 'About', nav_products: 'Products', nav_service: 'Service', nav_partners: 'Partners',
    nav_works: 'Our work', nav_faq: 'FAQ', nav_contacts: 'Contact',
    hero_title: 'The art of creating outdoor spaces',
    hero_sub: 'Pergolas, awnings, glazing and decking for homes, restaurants and cafés. Design, 3D, installation and service in Yerevan.',
    alt_hero: 'A lit terrace with a pergola in the evening, an ARÉVE project in Yerevan',
    btn_call: 'Call', btn_works: 'Our work',
    products_title: 'Products', more: 'Request',
    pergola: 'Pergolas', pergola_d: 'A light structure that gives shade on a terrace, in a courtyard or on a balcony.',
    awning: 'Awnings', awning_d: 'A retractable cover over a terrace, window or shopfront. Manual, electric or remote control.',
    glazing: 'Glazing', glazing_d: 'Glazing for terraces and verandas, including together with a pergola.',
    deck: 'Decking', deck_d: 'Flooring for terraces, poolsides and gardens.',
    umbrella: 'Umbrellas', umbrella_d: 'Large umbrellas for café and restaurant summer terraces.',
    carpet: 'Carpeting', carpet_d: 'We will tell you more by phone or WhatsApp.',
    process_title: 'How we work',
    s1: 'Design', s1_d: 'We choose the model, sizes and materials for your space.',
    s2: '3D visualisation', s2_d: 'You see how the structure will look before installation.',
    s3: 'Installation and set-up', s3_d: 'We install the structure and adjust every mechanism.',
    s4: 'Service', s4_d: 'Awning and pergola repair. Awnings come with a 5-year warranty.',
    works_title: 'Our work', works_all: 'All projects',
    form_title: 'Send a request',
    form_sub: 'We reply on WhatsApp. The price depends on the model, materials and options; we will calculate it for your space.',
    f_name: 'Name', f_phone: 'Phone', f_product: 'What you need', f_object: 'Site',
    o_home: 'Private home', o_rest: 'Restaurant, café', o_other: 'Other',
    f_size: 'Size, if known', f_comment: 'Comment',
    f_err: 'Please enter your name and phone.', f_send: 'Send via WhatsApp',
    f_note: 'WhatsApp opens with the message ready; just press Send.',
    p_unsure: 'Not sure yet, I need advice',
    wa_head: 'Request from the ARÉVE website',
    contacts_title: 'Contact',
    address: 'Business Palais business centre, 6 Yekmalyan St, 2nd floor, room 21, Yerevan 0002',
    map: 'Open in maps', slogan: 'Sun and rain are our element!'
  }
};

/* Продукты главной: id, фото (реальные объекты из site/img/work) */
const PRODUCTS = [
  { id: 'pergola', img: 'img/p-pergola.jpg' },
  { id: 'awning', img: 'img/p-awning.jpg' },
  { id: 'glazing', img: 'img/p-glazing.jpg' },
  { id: 'deck', img: 'img/p-deck.jpg' },
  { id: 'umbrella', img: 'img/p-umbrella.jpg' },
  { id: 'carpet', img: '' } // фото нет — попросить у владельца
];

/* 6 работ — тексты из site/work.js (названия заведений — с разрешения владельца, 17.10.2026) */
const WORKS = [
  { img: 'img/w015.jpg', sys: 'pergola',
    ru: 'Дом с бассейном', hy: 'Առանձնատուն լողավազանով', en: 'House with a pool' },
  { img: 'img/w021.jpg', sys: 'pergola', name: 'LOONA',
    ru: 'Ресторан у воды', hy: 'Ռեստորան ջրի մոտ', en: 'Restaurant by the water' },
  { img: 'img/w090.jpg', sys: 'glazing',
    ru: 'Терраса под стеклом', hy: 'Տեռաս ապակու տակ', en: 'Terrace under glass' },
  { img: 'img/w002.jpg', sys: 'pergola',
    ru: 'Терраса с оливами', hy: 'Տեռաս ձիթենիներով', en: 'Olive-tree terrace' },
  { img: 'img/w091.jpg', sys: 'umbrella', name: 'PAUL',
    ru: 'Уличное кафе', hy: 'Փողոցային սրճարան', en: 'Street café' },
  { img: 'img/w062.jpg', sys: 'wave',
    ru: 'Зал под волнами', hy: 'Սրահ ալիքների տակ', en: 'Hall under waves' }
];
