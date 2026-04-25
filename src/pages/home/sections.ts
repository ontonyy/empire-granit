import type { Locale } from '../../types';

export interface HeroFeature {
  icon: string;
  title: string;
  body: string;
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface StepItem {
  title: string;
  body: string;
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  meta: string;
}

export interface HomeSections {
  heroLabel: string;
  secondaryCta: string;
  featureCards: HeroFeature[];
  trustLabel: string;
  trustMetrics: TrustMetric[];
  processLabel: string;
  processTitle: string;
  processSteps: StepItem[];
  servicesLabel: string;
  servicesTitle: string;
  services: ServiceItem[];
  testimonialsLabel: string;
  testimonialsTitle: string;
  testimonials: TestimonialItem[];
}

export function getHomeSections(locale: Locale): HomeSections {
  if (locale === 'ru') {
    return {
      heroLabel: 'EMPIRE GRANIT · НАРВА',
      secondaryCta: 'Наши услуги',
      featureCards: [
        {
          icon: 'Связь',
          title: 'Быстрая служба поддержки',
          body: 'В рабочее время с нами можно связаться по телефону. В другое время оставьте сообщение через форму на сайте.'
        },
        {
          icon: 'Выбор',
          title: 'Широкий ассортимент изделий',
          body: 'Памятники и обрамления, вазы, скамейки, цветники, фотоэмали и гравировка портретов.'
        },
        { icon: 'EE', title: 'Работаем по всей Эстонии', body: 'Консультация, изготовление и установка в удобном формате.' },
        {
          icon: 'Услуги',
          title: 'Разнообразие услуг',
          body: 'Изготовление новых изделий, обновление и реставрация существующих, оформление мемориальных участков. Монтаж.'
        }
      ],
      trustLabel: 'ПОЧЕМУ НАС ВЫБИРАЮТ',
      trustMetrics: [
        { value: '10+', label: 'лет опыта' },
        { value: 'Более 500', label: 'выполненных заказов' }
      ],
      processLabel: 'КАК ЭТО ПРОИСХОДИТ',
      processTitle: 'Путь от первого звонка до готового изделия',
      processSteps: [
        { title: 'Связываетесь с нами', body: 'Мы предложим варианты оформления и учтём все ваши пожелания.' },
        {
          title: 'Согласование проекта',
          body: 'Выбор материала, формы, гравировки и фотоэмали. Согласование окончательной стоимости и сроков выполнения.'
        },
        { title: 'Выполнение заказа', body: 'Изготовление изделия и установка в согласованные сроки.' }
      ],
      servicesLabel: 'ЧТО МЫ ДЕЛАЕМ',
      servicesTitle: 'Основные услуги Empire Granit',
      services: [
        {
          title: 'Изготовление памятников и обрамлений',
          body: 'Производство мемориальных изделий различных форм и размеров с индивидуальным оформлением.'
        },
        {
          title: 'Гравировка и портреты',
          body: 'Подбор шрифтов и декоративных элементов, ретушь портретов, фотоэмаль, гравировка изображений.'
        },
        {
          title: 'Установка памятников',
          body: 'Профессиональный монтаж с соблюдением всех технических требований.'
        },
        {
          title: 'Благоустройство участка',
          body: 'Укладка плитки, щебень, песок, искусственная трава, оформление мемориальной зоны.'
        },
        {
          title: 'Реставрация и уход',
          body: 'Очистка от загрязнений, подкрашивание портретов и букв, восстановление внешнего вида памятника.'
        },
        {
          title: 'Оформление цветочной зоны',
          body: 'Вазы, цветники, подсвечники, скамейки и другие элементы оформления.'
        }
      ],
      testimonialsLabel: 'ОТЗЫВЫ',
      testimonialsTitle: 'Мы ценим обратную связь наших клиентов',
      testimonials: [
        {
          quote: 'Все объяснили очень спокойно, помогли выбрать памятник и не навязывали лишнего.',
          author: 'Ирина С.',
          meta: 'Нарва'
        },
        {
          quote: 'Сроки соблюли, установка прошла аккуратно, итог выглядел именно так, как обещали.',
          author: 'Александр П.',
          meta: 'Йыхви'
        },
        {
          quote:
            'Спасибо за гибкий подход. Мы договорились только об изготовлении и доставке, а установку решили выполнить самостоятельно. Всё было сделано качественно и в срок.',
          author: 'Марина К.',
          meta: 'Хаапсалу'
        }
      ]
    };
  }

  if (locale === 'et') {
    return {
      heroLabel: 'EMPIRE GRANIT · NARVA',
      secondaryCta: 'Meie teenused',
      featureCards: [
        {
          icon: 'Kontakt',
          title: 'Kiire klienditugi',
          body: 'Tööajal saab meiega ühendust telefoni teel. Muul ajal jätke sõnum veebilehe vormi kaudu.'
        },
        {
          icon: 'Valik',
          title: 'Lai tootevalik',
          body: 'Monumendid ja piirded, vaasid, pingid, lillealad, fotoemail ja portreegraveeringud.'
        },
        { icon: 'EE', title: 'Teenindame kogu Eestis', body: 'Nõustamine, valmistamine ja paigaldus sobivas vormis.' },
        {
          icon: 'Teenused',
          title: 'Mitmekülgsed teenused',
          body: 'Uute toodete valmistamine, olemasolevate uuendamine ja restaureerimine, mälestusplatside kujundamine. Paigaldus.'
        }
      ],
      trustLabel: 'MIKS MEID VALITAKSE',
      trustMetrics: [
        { value: '10+', label: 'aastat kogemust' },
        { value: 'Üle 500', label: 'täidetud tellimuse' }
      ],
      processLabel: 'KUIDAS SEE TOIMIB',
      processTitle: 'Tee esimesest kõnest valmis tooteni',
      processSteps: [
        { title: 'Võtate meiega ühendust', body: 'Pakume kujundusvõimalusi ja arvestame kõigi teie soovidega.' },
        {
          title: 'Projekti kooskõlastamine',
          body: 'Materjali, kuju, graveeringu ja fotoemaili valik. Lõpliku hinna ja tähtaegade kooskõlastamine.'
        },
        { title: 'Tellimuse täitmine', body: 'Toote valmistamine ja paigaldus kokkulepitud tähtajaks.' }
      ],
      servicesLabel: 'MIDA ME TEEME',
      servicesTitle: 'Empire Granit põhiteenused',
      services: [
        {
          title: 'Monumentide ja piirete valmistamine',
          body: 'Erineva kuju ja suurusega mälestustoodete valmistamine individuaalse kujundusega.'
        },
        {
          title: 'Graveeringud ja portreed',
          body: 'Kirjatüüpide ja dekoratiivsete elementide valik, portreede retušeerimine, fotoemail, piltide graveerimine.'
        },
        {
          title: 'Monumentide paigaldus',
          body: 'Professionaalne paigaldus kõiki tehnilisi nõudeid järgides.'
        },
        {
          title: 'Platsi korrastamine',
          body: 'Plaatide paigaldus, killustik, liiv, kunstmuru ja mälestusala kujundamine.'
        },
        {
          title: 'Restaureerimine ja hooldus',
          body: 'Mustuse eemaldamine, portreede ja tähtede toonimine, monumendi välimuse taastamine.'
        },
        {
          title: 'Lilleala kujundamine',
          body: 'Vaasid, lillekastid, küünlahoidjad, pingid ja muud kujunduselemendid.'
        }
      ],
      testimonialsLabel: 'TAGASISIDE',
      testimonialsTitle: 'Hindame oma klientide tagasisidet',
      testimonials: [
        {
          quote: 'Kõik selgitati väga rahulikult, meile ei surutud midagi peale ning valik sai kiiresti tehtud.',
          author: 'Irina S.',
          meta: 'Narva'
        },
        {
          quote: 'Tähtaegadest peeti kinni ja paigaldus tehti väga korrektselt. Tulemus vastas lubatule.',
          author: 'Aleksandr P.',
          meta: 'Jõhvi'
        },
        {
          quote:
            'Aitäh paindliku lähenemise eest. Leppisime kokku ainult valmistamises ja kohaletoimetamises ning otsustasime paigalduse ise teha. Kõik tehti kvaliteetselt ja õigeks ajaks.',
          author: 'Marina K.',
          meta: 'Haapsalu'
        }
      ]
    };
  }

  return {
    heroLabel: 'EMPIRE GRANIT · NARVA',
    secondaryCta: 'Our services',
    featureCards: [
      {
        icon: 'Support',
        title: 'Fast customer support',
        body: 'During working hours you can contact us by phone. At other times, leave a message through the website form.'
      },
      {
        icon: 'Range',
        title: 'Wide product range',
        body: 'Monuments and borders, vases, benches, flower beds, photo enamel, and portrait engraving.'
      },
      { icon: 'EE', title: 'Serving all Estonia', body: 'Consultation, production and installation arranged across the country.' },
      {
        icon: 'Services',
        title: 'Variety of services',
        body: 'Production of new items, renewal and restoration of existing ones, memorial site arrangement. Installation.'
      }
    ],
    trustLabel: 'WHY FAMILIES CHOOSE US',
    trustMetrics: [
      { value: '10+', label: 'years of experience' },
      { value: '500+', label: 'completed orders' }
    ],
    processLabel: 'HOW IT WORKS',
    processTitle: 'From the first call to the finished product',
    processSteps: [
      { title: 'You contact us', body: 'We suggest design options and take all your wishes into account.' },
      {
        title: 'Project approval',
        body: 'Selection of material, shape, engraving, and photo enamel. Final price and lead time approval.'
      },
      { title: 'Order fulfillment', body: 'Production of the item and installation within the agreed timeframe.' }
    ],
    servicesLabel: 'WHAT WE OFFER',
    servicesTitle: 'Core Empire Granit services',
    services: [
      {
        title: 'Monument and border manufacturing',
        body: 'Production of memorial products in various shapes and sizes with individual design.'
      },
      {
        title: 'Engraving and portraits',
        body: 'Selection of fonts and decorative elements, portrait retouching, photo enamel, and image engraving.'
      },
      {
        title: 'Monument installation',
        body: 'Professional installation in line with all technical requirements.'
      },
      {
        title: 'Site improvement',
        body: 'Tile laying, gravel, sand, artificial grass, and memorial area arrangement.'
      },
      {
        title: 'Restoration and care',
        body: 'Cleaning dirt, retouching portraits and letters, restoring the monument appearance.'
      },
      {
        title: 'Flower area design',
        body: 'Vases, flower beds, candle holders, benches, and other decorative elements.'
      }
    ],
    testimonialsLabel: 'TESTIMONIALS',
    testimonialsTitle: 'We value feedback from our clients',
    testimonials: [
      {
        quote: 'Everything was explained calmly, the monument was selected without pressure, and the process felt clear.',
        author: 'Irina S.',
        meta: 'Narva'
      },
      {
        quote: 'The timing was kept, installation was neat, and the final result matched what we were promised.',
        author: 'Aleksandr P.',
        meta: 'Jõhvi'
      },
      {
        quote:
          'Thank you for the flexible approach. We agreed on manufacturing and delivery only, and decided to handle the installation ourselves. Everything was done with quality and on time.',
        author: 'Marina K.',
        meta: 'Haapsalu'
      }
    ]
  };
}
