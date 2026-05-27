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
  { id: 'kivi', imageBase: 'tombstone', title: { en: 'Solo monument', et: 'Üksik mälestusmärk', ru: 'Одиночный памятник' }, material: 'Karelia Red', captionKey: 'soloMonument' },
  { id: 'paas', imageBase: 'stone_plate', title: { en: 'Plate', et: 'Plaat', ru: 'Плита' }, material: 'Indian Black', captionKey: 'goldEngraving' },
  { id: 'mets', imageBase: 'exclusive', title: { en: 'Duo', et: 'Topelt', ru: 'Двойной' }, material: 'Indian Aurora', captionKey: 'doubleMonument' }
];
