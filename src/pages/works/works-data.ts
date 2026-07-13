import type { Locale } from '../../types';
import engravingSpecs from './engravings.data.json';
import environmentSpecs from './environment.data.json';

export type WorkCategory =
  | 'monuments'
  | 'fences'
  | 'engravings'
  | 'landscaping';

export type WorkRatio = 'portrait' | 'landscape' | 'square';

export type LocalizedTitle = Record<Locale, string>;

export interface WorkItem {
  id: string;
  title: LocalizedTitle;
  material: string;
  category: WorkCategory;
  imageBase: string;
  /** Optional second image (hover-swap): shown on hover, focus, or touch flip. */
  hoverImageBase?: string;
  width: number;
  height: number;
  ratio: WorkRatio;
  captionKey: string;
  /** Optional localized details (dimensions text) shown in a click-to-open panel. */
  description?: Record<Locale, string>;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  'monuments',
  'fences',
  'engravings',
  'landscaping'
];

export interface WorkSwatch {
  /** Stable id, also the locale key under works.swatches.items. */
  id: string;
  /** Approximate granite tone for the swatch chip. */
  hex: string;
}

/** Granite materials shown in the works-tab swatch band (Wave 15). */
export const WORK_SWATCHES: WorkSwatch[] = [
  { id: 'karelia-red', hex: '#7a2e2a' },
  { id: 'lithuanian-black', hex: '#1b1b1d' },
  { id: 'karelian-black', hex: '#2b2b2e' },
  { id: 'volga-blue', hex: '#2f4a5c' },
  { id: 'indian-aurora', hex: '#3a2f33' },
  { id: 'aurora-red', hex: '#6b2b30' },
  { id: 'mixed-granite', hex: '#8a8076' }
];

interface MonumentSpec {
  /** Numeric part of the base id, e.g. '005'. */
  n: string;
  /** True when a two-variant hover (_alt) asset exists. */
  hover: boolean;
  width: number;
  height: number;
  ratio: WorkRatio;
}

/** Optimized monument photos (public/images/n3/monuments/pamNNN[_alt]). */
const MONUMENT_SPECS: MonumentSpec[] = [
  { n: '001', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '002', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '003', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '004', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '005', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '006', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '007', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '008', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '009', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '010', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '011', hover: false, width: 1200, height: 800, ratio: 'landscape' },
  { n: '012', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '013', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '014', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '015', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '016', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '017', hover: true, width: 1200, height: 800, ratio: 'landscape' },
  { n: '018', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '019', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '020', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '021', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '022', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '023', hover: false, width: 900, height: 1200, ratio: 'portrait' },
  { n: '024', hover: false, width: 675, height: 1200, ratio: 'portrait' },
  { n: '025', hover: false, width: 675, height: 1200, ratio: 'portrait' }
];

const galleryTitle = (number: string, type: 'bench' | 'engraving' | 'monument'): LocalizedTitle => {
  const labels = {
    bench: { en: 'Bench', et: 'Pink', ru: 'Скамейка' },
    engraving: { en: 'Engraving', et: 'Graveering', ru: 'Гравировка' },
    monument: { en: 'Monument', et: 'Mälestusmärk', ru: 'Памятник' }
  } as const;
  const label = labels[type];
  return { en: `${label.en} ${number}`, et: `${label.et} ${number}`, ru: `${label.ru} ${number}` };
};

const MONUMENT_WORKS: WorkItem[] = MONUMENT_SPECS.map((spec) => ({
  id: `pam${spec.n}`,
  title: galleryTitle(spec.n, 'monument'),
  material: '',
  category: 'monuments',
  imageBase: `pam${spec.n}`,
  ...(spec.hover ? { hoverImageBase: `pam${spec.n}_alt` } : {}),
  width: spec.width,
  height: spec.height,
  ratio: spec.ratio,
  captionKey: 'familyMonument'
}));

/** Optimized fence photos (public/images/n3/fences/ogNNN[_alt]). */
const FENCE_WORKS: WorkItem[] = Array.from({ length: 20 }, (_, index) => {
    const number = String(index + 1).padStart(3, '0');
    const isDualVariant = index >= 5 && index <= 15;
    const dimensions = [
      [1200, 800], [1200, 800], [1200, 800], [1200, 800], [1200, 800],
      [1200, 800], [1200, 800], [1200, 800], [1200, 800], [1200, 800],
      [1200, 800], [1200, 800], [1200, 800], [1200, 800], [1200, 800],
      [1200, 800], [1200, 901], [1200, 540], [1200, 675], [1200, 900]
    ][index];

    return {
      id: `og-${number}`,
      title: { en: `Fence ${number}`, et: `Piire ${number}`, ru: `Ограда ${number}` },
      material: 'Granite',
      category: 'fences' as const,
      imageBase: `og${number}`,
      ...(isDualVariant ? { hoverImageBase: `og${number}_alt` } : {}),
      width: dimensions[0],
      height: dimensions[1],
      ratio: 'landscape' as const,
      captionKey: 'graniteBorder'
    };
});

/** Optimized engraving photos (public/images/n3/engravings/compNNN). */
const ENGRAVING_WORKS: WorkItem[] = engravingSpecs.map((spec, index) => ({
  id: spec.id,
  title: galleryTitle(String(index + 1).padStart(3, '0'), 'engraving'),
  material: '',
  category: 'engravings',
  imageBase: spec.imageBase,
  width: spec.width,
  height: spec.height,
  ratio: spec.ratio as WorkRatio,
  captionKey: 'goldEngraving'
}));

/** Optimized landscaping bench photos (public/images/n3/environment/blagNNN[_alt]). */
const LANDSCAPING_WORKS: WorkItem[] = environmentSpecs.map((spec, index) => ({
  id: spec.id,
  title: galleryTitle(String(index + 1).padStart(3, '0'), 'bench'),
  material: '',
  category: 'landscaping',
  imageBase: spec.imageBase,
  ...(spec.hoverImageBase ? { hoverImageBase: spec.hoverImageBase } : {}),
  width: spec.width,
  height: spec.height,
  ratio: spec.ratio as WorkRatio,
  captionKey: 'installation',
  description: spec.description as Record<Locale, string>
}));

export const WORKS: WorkItem[] = [
  ...MONUMENT_WORKS,
  ...FENCE_WORKS,
  ...ENGRAVING_WORKS,
  ...LANDSCAPING_WORKS
];
