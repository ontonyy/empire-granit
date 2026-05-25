export interface HomeWorkExample {
  id: string;
  image: string;
  title: string;
  material: string;
}

export const HOME_WORKS_EXAMPLES: HomeWorkExample[] = [
  { id: 'tamm', image: '/images/examples/monument.png', title: 'Tamm', material: 'Karelia Red' },
  { id: 'kask', image: '/images/examples/fence_with_entrance.png', title: 'Kask', material: 'Lithuanian Black' },
  { id: 'lepik', image: '/images/examples/gravestone.png', title: 'Lepik', material: 'Karelian Black' },
  { id: 'saar', image: '/images/examples/granite_bench.png', title: 'Saar', material: 'Volga Blue' },
  { id: 'mets', image: '/images/examples/exclusive.png', title: 'Mets', material: 'Indian Aurora' }
];
