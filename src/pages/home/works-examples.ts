export interface HomeWorkExample {
  id: string;
  imageBase: string;
  title: string;
  material: string;
}

export const HOME_WORKS_EXAMPLES: HomeWorkExample[] = [
  { id: 'tamm', imageBase: 'monument', title: 'Tamm', material: 'Karelia Red' },
  { id: 'kask', imageBase: 'fence_with_entrance', title: 'Kask', material: 'Lithuanian Black' },
  { id: 'lepik', imageBase: 'gravestone', title: 'Lepik', material: 'Karelian Black' },
  { id: 'saar', imageBase: 'granite_bench', title: 'Saar', material: 'Volga Blue' },
  { id: 'mets', imageBase: 'exclusive', title: 'Mets', material: 'Indian Aurora' }
];
