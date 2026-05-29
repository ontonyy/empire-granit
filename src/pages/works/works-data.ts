import type { Locale } from '../../types';

export type WorkCategory =
  | 'monuments'
  | 'fences'
  | 'engravings'
  | 'installation';

export type WorkRatio = 'portrait' | 'landscape' | 'square';

export type LocalizedTitle = Record<Locale, string>;

export interface WorkItem {
  id: string;
  title: LocalizedTitle;
  material: string;
  category: WorkCategory;
  imageBase: string;
  width: number;
  height: number;
  ratio: WorkRatio;
  captionKey: string;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  'monuments',
  'fences',
  'engravings',
  'installation'
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

export const WORKS: WorkItem[] = [
  {
    id: 'tamm-monument',
    title: { en: 'Monument', et: 'Mälestusmärk', ru: 'Памятник' },
    material: 'Karelia Red',
    category: 'monuments',
    imageBase: 'gravestone',
    width: 408,
    height: 612,
    ratio: 'portrait',
    captionKey: 'familyMonument'
  },
  {
    id: 'kask-piire',
    title: { en: 'Border', et: 'Piire', ru: 'Ограда' },
    material: 'Lithuanian Black',
    category: 'fences',
    imageBase: 'granite_fence',
    width: 750,
    height: 588,
    ratio: 'landscape',
    captionKey: 'graniteBorder'
  },
  {
    id: 'lepik-graveering',
    title: { en: 'Portrait', et: 'Portree', ru: 'Портрет' },
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'memorial_table',
    width: 600,
    height: 451,
    ratio: 'landscape',
    captionKey: 'portrait'
  },
  {
    id: 'saar-paigaldus',
    title: { en: 'Installation', et: 'Paigaldus', ru: 'Установка' },
    material: 'Volga Blue',
    category: 'installation',
    imageBase: 'exclusive',
    width: 1024,
    height: 1024,
    ratio: 'square',
    captionKey: 'installation'
  },
  {
    id: 'mets-duo',
    title: { en: 'Duo', et: 'Topelt', ru: 'Двойной' },
    material: 'Indian Aurora',
    category: 'monuments',
    imageBase: 'monument',
    width: 1400,
    height: 933,
    ratio: 'square',
    captionKey: 'doubleMonument'
  },
  {
    id: 'kuusk-piire',
    title: { en: 'Low border', et: 'Madalpiire', ru: 'Низкая' },
    material: 'Karelia Red',
    category: 'fences',
    imageBase: 'stone_plate',
    width: 561,
    height: 679,
    ratio: 'portrait',
    captionKey: 'lowBorder'
  },
  {
    id: 'rebane-pilt',
    title: { en: 'Enamel', et: 'Email', ru: 'Эмаль' },
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'tombstone',
    width: 612,
    height: 408,
    ratio: 'landscape',
    captionKey: 'photoEnamel'
  },
  {
    id: 'oja-restaureerimine',
    title: { en: 'Restoration', et: 'Taastamine', ru: 'Реставрация' },
    material: 'Mixed granite',
    category: 'installation',
    imageBase: 'fence_with_entrance',
    width: 900,
    height: 600,
    ratio: 'landscape',
    captionKey: 'restoration'
  },
  {
    id: 'kallas-solo',
    title: { en: 'Solo', et: 'Soolo', ru: 'Соло' },
    material: 'Aurora Red',
    category: 'monuments',
    imageBase: 'fence',
    width: 1024,
    height: 1024,
    ratio: 'square',
    captionKey: 'soloMonument'
  },
  {
    id: 'lill-piire',
    title: { en: 'Tall border', et: 'Kõrgpiire', ru: 'Высокая' },
    material: 'Lithuanian Black',
    category: 'fences',
    imageBase: 'framing',
    width: 1400,
    height: 933,
    ratio: 'square',
    captionKey: 'tallBorder'
  },
  {
    id: 'kuld-ornament',
    title: { en: 'Engraving', et: 'Graveering', ru: 'Гравировка' },
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'granite_bench',
    width: 700,
    height: 800,
    ratio: 'portrait',
    captionKey: 'goldEngraving'
  },
  {
    id: 'paju-paigaldus',
    title: { en: 'Installation', et: 'Paigaldus', ru: 'Установка' },
    material: 'Indian Aurora',
    category: 'installation',
    imageBase: 'bench',
    width: 800,
    height: 600,
    ratio: 'landscape',
    captionKey: 'installation'
  }
];
