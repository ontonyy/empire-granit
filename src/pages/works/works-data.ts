export type WorkCategory =
  | 'monuments'
  | 'fences'
  | 'engravings'
  | 'installation';

export type WorkRatio = 'portrait' | 'landscape' | 'square';

export interface WorkItem {
  id: string;
  title: string;
  material: string;
  category: WorkCategory;
  image: string;
  ratio: WorkRatio;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  'monuments',
  'fences',
  'engravings',
  'installation'
];

export const WORKS: WorkItem[] = [
  {
    id: 'tamm-monument',
    title: 'Tamm — perekonnamonument',
    material: 'Karelia Red',
    category: 'monuments',
    image: '/images/works/placeholder-01.jpg',
    ratio: 'portrait'
  },
  {
    id: 'kask-piire',
    title: 'Kask — graniidist piire',
    material: 'Lithuanian Black',
    category: 'fences',
    image: '/images/works/placeholder-02.jpg',
    ratio: 'landscape'
  },
  {
    id: 'lepik-graveering',
    title: 'Lepik — portreegraveering',
    material: 'Karelian Black',
    category: 'engravings',
    image: '/images/works/placeholder-03.jpg',
    ratio: 'landscape'
  },
  {
    id: 'saar-paigaldus',
    title: 'Saar — paigaldus Tallinnas',
    material: 'Volga Blue',
    category: 'installation',
    image: '/images/works/placeholder-04.jpg',
    ratio: 'square'
  },
  {
    id: 'mets-duo',
    title: 'Mets — kahekohaline monument',
    material: 'Indian Aurora',
    category: 'monuments',
    image: '/images/works/placeholder-05.jpg',
    ratio: 'square'
  },
  {
    id: 'kuusk-piire',
    title: 'Kuusk — madalpiire ja vaas',
    material: 'Karelia Red',
    category: 'fences',
    image: '/images/works/placeholder-06.jpg',
    ratio: 'portrait'
  },
  {
    id: 'rebane-pilt',
    title: 'Rebane — fotoemail',
    material: 'Karelian Black',
    category: 'engravings',
    image: '/images/works/placeholder-07.jpg',
    ratio: 'landscape'
  },
  {
    id: 'oja-restaureerimine',
    title: 'Oja — vana platsi taastamine',
    material: 'Mixed granite',
    category: 'installation',
    image: '/images/works/placeholder-08.jpg',
    ratio: 'landscape'
  },
  {
    id: 'kallas-solo',
    title: 'Kallas — soolomonument',
    material: 'Aurora Red',
    category: 'monuments',
    image: '/images/works/placeholder-09.jpg',
    ratio: 'square'
  },
  {
    id: 'lill-piire',
    title: 'Lill — kõrgpiire ja lillealus',
    material: 'Lithuanian Black',
    category: 'fences',
    image: '/images/works/placeholder-10.jpg',
    ratio: 'square'
  },
  {
    id: 'kuld-ornament',
    title: 'Kuld — kuldgraveering',
    material: 'Karelian Black',
    category: 'engravings',
    image: '/images/works/placeholder-11.jpg',
    ratio: 'portrait'
  },
  {
    id: 'paju-paigaldus',
    title: 'Paju — paigaldus Narva-Jõesuus',
    material: 'Indian Aurora',
    category: 'installation',
    image: '/images/works/placeholder-12.jpg',
    ratio: 'landscape'
  }
];
