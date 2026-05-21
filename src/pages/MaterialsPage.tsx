import { GraniteSwatchTile } from '../components/GraniteSwatchTile';
import { Button, DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { GraniteSwatch, Locale, LocaleContent } from '../types';
import { withAdditionalGraniteSwatches } from './catalog/granite-swatches';

interface MaterialsPageProps {
  locale: Locale;
}

type MaterialInfo = {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  note: string;
  swatch: GraniteSwatch;
};

type MaterialsPageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  graniteTitle: string;
  graniteIntro: string;
  finishesTitle: string;
  finishesIntro: string;
  engravingTitle: string;
  engravingIntro: string;
  comparisonTitle: string;
  comparisonIntro: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  labels: {
    bestFor: string;
    note: string;
    finishLook: string;
    finishUse: string;
    engravingMethod: string;
    engravingUse: string;
    compareStrength: string;
    compareConsider: string;
  };
  materials?: Array<Omit<MaterialInfo, 'swatch'> & { textureKey: string }>;
  finishes: Array<{
    id: string;
    title: string;
    look: string;
    use: string;
  }>;
  engraving: Array<{
    id: string;
    title: string;
    method: string;
    use: string;
  }>;
  comparison: Array<{
    id: string;
    title: string;
    strength: string;
    consider: string;
  }>;
};

const fallbackCopy: Record<Locale, MaterialsPageContent> = {
  et: {
    eyebrow: 'Materjalid',
    heading: 'Graniit, viimistlus ja graveering ühes vaates',
    intro:
      'Materjali valik mõjutab monumendi üldmuljet, teksti loetavust ja hooldust. Siin on rahulik ülevaade peamistest valikutest enne tellimust.',
    graniteTitle: 'Graniidi valik',
    graniteIntro: 'Levinumad toonid katavad suure osa klassikalistest ja kaasaegsetest memoriaallahendustest.',
    finishesTitle: 'Viimistlused',
    finishesIntro: 'Viimistlus määrab, kui peegeldav, tagasihoidlik või kontrastne pind jääb.',
    engravingTitle: 'Graveering',
    engravingIntro: 'Tekst, portree ja sümbolid planeeritakse koos kivitooni ja viimistlusega.',
    comparisonTitle: 'Materjalide kõrvutus',
    comparisonIntro: 'Kõrvutus aitab valida rahuliku üldmulje, kontrasti ja hoolduse vahel.',
    ctaTitle: 'Kas vajad abi materjali valikul?',
    ctaBody: 'Saada mõõdud, soovitud tekst ja asukoht. Aitame valida sobiva graniidi, viimistluse ja graveeringu.',
    ctaLabel: 'Küsi nõu',
    labels: {
      bestFor: 'Sobib',
      note: 'Märkus',
      finishLook: 'Ilme',
      finishUse: 'Kasutus',
      engravingMethod: 'Meetod',
      engravingUse: 'Sobib',
      compareStrength: 'Tugevus',
      compareConsider: 'Arvesta'
    },
    finishes: [
      { id: 'polished', title: 'Poleeritud', look: 'Sügav toon ja tugev peegeldus.', use: 'Esipind, tekstiala ja kontrastsed detailid.' },
      { id: 'matte', title: 'Matt', look: 'Rahulik, pehme ja vähem peegeldav.', use: 'Tagasihoidlikud monumendid ja looduslikum üldmulje.' },
      { id: 'mixed', title: 'Kombineeritud', look: 'Poleeritud ja mati pinna tasakaal.', use: 'Kui tekst peab eristuma, kuid kogu monument ei pea läikima.' }
    ],
    engraving: [
      { id: 'text', title: 'Tekst', method: 'Süvistatud või toonitud kiri.', use: 'Nimed, kuupäevad ja lühike pühendus.' },
      { id: 'portrait', title: 'Portree', method: 'Graveering või fotoemail.', use: 'Kui foto kvaliteet ja kivitoon sobivad valitud tehnikaga.' },
      { id: 'symbols', title: 'Sümbolid', method: 'Väike ornament, rist, lill või muu märk.', use: 'Tasakaalustatud lisad ilma liigse dekoratiivsuseta.' }
    ],
    comparison: [
      { id: 'dark', title: 'Tume graniit', strength: 'Kõrge kontrast ja väärikas sügav toon.', consider: 'Sõrmejäljed ja tolm võivad paremini näha jääda.' },
      { id: 'grey', title: 'Hall graniit', strength: 'Praktiline, rahulik ja sobib paljudele vormidele.', consider: 'Peenem tekst vajab hoolikat kontrasti planeerimist.' },
      { id: 'warm', title: 'Soe toon', strength: 'Pehmem üldmulje ja hea sobivus loodusliku ümbrusega.', consider: 'Lisad tuleb valida tooniga ettevaatlikult kokku.' }
    ]
  },
  ru: {
    eyebrow: 'Материалы',
    heading: 'Гранит, отделка и гравировка в одном обзоре',
    intro:
      'Выбор материала влияет на общий вид памятника, читаемость текста и уход. Здесь собраны основные варианты перед заказом.',
    graniteTitle: 'Выбор гранита',
    graniteIntro: 'Основные оттенки подходят для большинства классических и современных мемориальных решений.',
    finishesTitle: 'Отделки',
    finishesIntro: 'Отделка определяет блеск, спокойствие поверхности и контраст деталей.',
    engravingTitle: 'Гравировка',
    engravingIntro: 'Текст, портрет и символы подбираются вместе с цветом камня и отделкой.',
    comparisonTitle: 'Сравнение материалов',
    comparisonIntro: 'Сравнение помогает выбрать между спокойным видом, контрастом и практичностью ухода.',
    ctaTitle: 'Нужна помощь с выбором материала?',
    ctaBody: 'Отправьте размеры, желаемый текст и место установки. Поможем выбрать гранит, отделку и гравировку.',
    ctaLabel: 'Получить совет',
    labels: {
      bestFor: 'Подходит',
      note: 'Примечание',
      finishLook: 'Вид',
      finishUse: 'Применение',
      engravingMethod: 'Метод',
      engravingUse: 'Подходит',
      compareStrength: 'Плюс',
      compareConsider: 'Учесть'
    },
    finishes: [
      { id: 'polished', title: 'Полировка', look: 'Глубокий цвет и заметное отражение.', use: 'Лицевая сторона, зона текста и контрастные детали.' },
      { id: 'matte', title: 'Матовая', look: 'Спокойная, мягкая, с меньшим отражением.', use: 'Сдержанные памятники и более природный общий вид.' },
      { id: 'mixed', title: 'Комбинированная', look: 'Баланс полированной и матовой поверхности.', use: 'Когда текст должен выделяться, но весь памятник не должен блестеть.' }
    ],
    engraving: [
      { id: 'text', title: 'Текст', method: 'Углубленная или тонированная надпись.', use: 'Имена, даты и короткое посвящение.' },
      { id: 'portrait', title: 'Портрет', method: 'Гравировка или фотоэмаль.', use: 'Когда качество фото и оттенок камня подходят выбранной технике.' },
      { id: 'symbols', title: 'Символы', method: 'Небольшой орнамент, крест, цветок или другой знак.', use: 'Аккуратные детали без лишней декоративности.' }
    ],
    comparison: [
      { id: 'dark', title: 'Темный гранит', strength: 'Высокий контраст и глубокий торжественный тон.', consider: 'Пыль и следы могут быть заметнее.' },
      { id: 'grey', title: 'Серый гранит', strength: 'Практичный, спокойный, подходит многим формам.', consider: 'Мелкий текст требует продуманного контраста.' },
      { id: 'warm', title: 'Теплый оттенок', strength: 'Более мягкий вид и хорошее сочетание с природной средой.', consider: 'Дополнительные элементы нужно аккуратно подбирать по тону.' }
    ]
  },
  en: {
    eyebrow: 'Materials',
    heading: 'Granite, finishes, and engraving in one view',
    intro:
      'Material choice shapes the memorial mood, inscription readability, and long-term care. This page brings the main decisions together before ordering.',
    graniteTitle: 'Granite selection',
    graniteIntro: 'Core tones cover most classic and modern memorial combinations.',
    finishesTitle: 'Finishes',
    finishesIntro: 'Finish controls how reflective, quiet, or contrast-rich the stone surface feels.',
    engravingTitle: 'Engraving',
    engravingIntro: 'Text, portraits, and symbols are planned together with stone tone and finish.',
    comparisonTitle: 'Side-by-side material comparison',
    comparisonIntro: 'Compare mood, contrast, and care needs before narrowing the choice.',
    ctaTitle: 'Need help choosing material?',
    ctaBody: 'Send dimensions, desired inscription, and cemetery location. We will help select granite, finish, and engraving.',
    ctaLabel: 'Ask for advice',
    labels: {
      bestFor: 'Best for',
      note: 'Note',
      finishLook: 'Look',
      finishUse: 'Use',
      engravingMethod: 'Method',
      engravingUse: 'Use',
      compareStrength: 'Strength',
      compareConsider: 'Consider'
    },
    finishes: [
      { id: 'polished', title: 'Polished', look: 'Deep color with a clear reflection.', use: 'Front faces, inscription areas, and contrast details.' },
      { id: 'matte', title: 'Matte', look: 'Quiet, soft, and less reflective.', use: 'Restrained memorials and a more natural overall impression.' },
      { id: 'mixed', title: 'Mixed', look: 'Balanced polished and matte surfaces.', use: 'When text needs contrast but the whole stone should not shine.' }
    ],
    engraving: [
      { id: 'text', title: 'Text', method: 'Recessed or toned lettering.', use: 'Names, dates, and a short dedication.' },
      { id: 'portrait', title: 'Portrait', method: 'Engraving or photo enamel.', use: 'When the photo quality and stone tone fit the selected technique.' },
      { id: 'symbols', title: 'Symbols', method: 'Small ornament, cross, flower, or other mark.', use: 'Balanced details without excessive decoration.' }
    ],
    comparison: [
      { id: 'dark', title: 'Dark granite', strength: 'High contrast and dignified depth.', consider: 'Dust and fingerprints can be more visible.' },
      { id: 'grey', title: 'Grey granite', strength: 'Practical, calm, and suitable for many forms.', consider: 'Fine text needs careful contrast planning.' },
      { id: 'warm', title: 'Warm tone', strength: 'Softer mood and good fit with natural surroundings.', consider: 'Additional details need careful color matching.' }
    ]
  }
};

function getMaterialsContent(content: LocaleContent, locale: Locale): MaterialsPageContent {
  return (content as LocaleContent & { materials?: MaterialsPageContent }).materials ?? fallbackCopy[locale];
}

function uniqueSwatches(swatches: GraniteSwatch[]): GraniteSwatch[] {
  const seen = new Set<string>();
  return swatches.filter((swatch) => {
    if (seen.has(swatch.textureKey)) {
      return false;
    }

    seen.add(swatch.textureKey);
    return true;
  });
}

function buildSwatches(locale: Locale, content: LocaleContent): GraniteSwatch[] {
  const gallerySwatches = [...content.gallery.categories, ...content.gallery.catalogCategories].flatMap(
    (category) => category.graniteSwatches ?? []
  );

  return uniqueSwatches(withAdditionalGraniteSwatches(locale, gallerySwatches)).slice(0, 8);
}

function buildMaterials(copy: MaterialsPageContent, swatches: GraniteSwatch[]): MaterialInfo[] {
  if (copy.materials?.length) {
    return copy.materials
      .map((material) => {
        const swatch = swatches.find((item) => item.textureKey === material.textureKey);
        if (!swatch) {
          return undefined;
        }

        const { textureKey: _textureKey, ...materialInfo } = material;
        return { ...materialInfo, swatch };
      })
      .filter((material): material is MaterialInfo => Boolean(material));
  }

  return swatches.slice(0, 6).map((swatch) => ({
    id: swatch.id,
    name: swatch.name,
    description: copy.graniteIntro,
    bestFor:
      swatch.textureKey === 'black-granite'
        ? copy.comparison[0].strength
        : swatch.textureKey === 'grey-granite'
          ? copy.comparison[1].strength
          : copy.comparison[2].strength,
    note:
      swatch.textureKey === 'black-granite'
        ? copy.comparison[0].consider
        : swatch.textureKey === 'grey-granite'
          ? copy.comparison[1].consider
          : copy.comparison[2].consider,
    swatch
  }));
}

export function MaterialsPage({ locale }: MaterialsPageProps) {
  const content = getLocaleContent(locale);
  const copy = getMaterialsContent(content, locale);
  const swatches = buildSwatches(locale, content);
  const materials = buildMaterials(copy, swatches);

  return (
    <main className="content-panel catalog-grid-page">
      <header className="page-hero">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <DisplayHeading level={1}>{copy.heading}</DisplayHeading>
        <p>{copy.intro}</p>
      </header>

      <section className="catalog-grid-section reveal-on-scroll" aria-labelledby="materials-granite-heading">
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2} id="materials-granite-heading">
            {copy.graniteTitle}
          </DisplayHeading>
          <p>{copy.graniteIntro}</p>
        </header>
        <div className="catalog-grid">
          {materials.map((material) => (
            <article key={material.id} className="ui-card">
              <div className="ui-card__media">
                <GraniteSwatchTile swatch={material.swatch} />
              </div>
              <div className="ui-card__body">
                <h3 className="ui-card__title">{material.name}</h3>
                <p className="ui-card__desc">{material.description}</p>
                <p className="ui-card__desc">
                  <strong>{copy.labels.bestFor}:</strong> {material.bestFor}
                </p>
                <p className="ui-card__desc">
                  <strong>{copy.labels.note}:</strong> {material.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-grid-section reveal-on-scroll" aria-labelledby="materials-finishes-heading">
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2} id="materials-finishes-heading">
            {copy.finishesTitle}
          </DisplayHeading>
          <p>{copy.finishesIntro}</p>
        </header>
        <div className="pricing-tier-grid">
          {copy.finishes.map((finish) => (
            <article key={finish.id} className="pricing-tier-card">
              <h3 className="pricing-tier-title">{finish.title}</h3>
              <p>
                <strong>{copy.labels.finishLook}:</strong> {finish.look}
              </p>
              <p>
                <strong>{copy.labels.finishUse}:</strong> {finish.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-grid-section reveal-on-scroll" aria-labelledby="materials-engraving-heading">
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2} id="materials-engraving-heading">
            {copy.engravingTitle}
          </DisplayHeading>
          <p>{copy.engravingIntro}</p>
        </header>
        <div className="process-story" aria-label={copy.engravingTitle}>
          {copy.engraving.map((item) => (
            <article key={item.id} className="process-story-step">
              <div className="process-story-copy">
                <h3 className="cinzel-font">{item.title}</h3>
                <p>
                  <strong>{copy.labels.engravingMethod}:</strong> {item.method}
                </p>
                <p>
                  <strong>{copy.labels.engravingUse}:</strong> {item.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-grid-section reveal-on-scroll" aria-labelledby="materials-comparison-heading">
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2} id="materials-comparison-heading">
            {copy.comparisonTitle}
          </DisplayHeading>
          <p>{copy.comparisonIntro}</p>
        </header>
        <div className="pricing-benefits-grid">
          {copy.comparison.map((item) => (
            <article key={item.id} className="pricing-benefit-card">
              <h3>{item.title}</h3>
              <p>
                <strong>{copy.labels.compareStrength}:</strong> {item.strength}
              </p>
              <p>
                <strong>{copy.labels.compareConsider}:</strong> {item.consider}
              </p>
            </article>
          ))}
        </div>
      </section>

      <aside className="process-consultation reveal-on-scroll">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="cinzel-font">{copy.ctaTitle}</h2>
          <p>{copy.ctaBody}</p>
        </div>
        <Button as="router-link" to={buildLocalizedPath(locale, 'contact')} className="process-consultation-cta">
          {copy.ctaLabel}
        </Button>
      </aside>
    </main>
  );
}
