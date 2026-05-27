import type { Locale } from '../../types';

export type LocalizedTitle = Record<Locale, string>;

export interface HomeWorkExample {
  id: string;
  imageBase: string;
  title: LocalizedTitle;
  material: string;
  captionKey: string;
}

export const HOME_WORKS_EXAMPLES: HomeWorkExample[] = [
  { id: 'tamm', imageBase: 'monument', title: { en: 'Monument', et: 'Mälestusmärk', ru: 'Памятник' }, material: 'Karelia Red', captionKey: 'familyMonument' },
  { id: 'kask', imageBase: 'fence_with_entrance', title: { en: 'Border', et: 'Piire', ru: 'Ограда' }, material: 'Lithuanian Black', captionKey: 'graniteBorder' },
  { id: 'lepik', imageBase: 'gravestone', title: { en: 'Portrait', et: 'Portree', ru: 'Портрет' }, material: 'Karelian Black', captionKey: 'portrait' },
  { id: 'saar', imageBase: 'granite_bench', title: { en: 'Installation', et: 'Paigaldus', ru: 'Установка' }, material: 'Volga Blue', captionKey: 'installation' },
  { id: 'mets', imageBase: 'exclusive', title: { en: 'Duo', et: 'Topelt', ru: 'Двойной' }, material: 'Indian Aurora', captionKey: 'doubleMonument' }
];
