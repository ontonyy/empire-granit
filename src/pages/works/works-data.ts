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
  imageBase: string;
  width: number;
  height: number;
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
    imageBase: 'gravestone',
    width: 408,
    height: 612,
    ratio: 'portrait'
  },
  {
    id: 'kask-piire',
    title: 'Kask — graniidist piire',
    material: 'Lithuanian Black',
    category: 'fences',
    imageBase: 'granite_fence',
    width: 750,
    height: 588,
    ratio: 'landscape'
  },
  {
    id: 'lepik-graveering',
    title: 'Lepik — portreegraveering',
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'memorial_table',
    width: 600,
    height: 451,
    ratio: 'landscape'
  },
  {
    id: 'saar-paigaldus',
    title: 'Saar — paigaldus Tallinnas',
    material: 'Volga Blue',
    category: 'installation',
    imageBase: 'exclusive',
    width: 1024,
    height: 1024,
    ratio: 'square'
  },
  {
    id: 'mets-duo',
    title: 'Mets — kahekohaline monument',
    material: 'Indian Aurora',
    category: 'monuments',
    imageBase: 'monument',
    width: 1400,
    height: 933,
    ratio: 'square'
  },
  {
    id: 'kuusk-piire',
    title: 'Kuusk — madalpiire ja vaas',
    material: 'Karelia Red',
    category: 'fences',
    imageBase: 'stone_plate',
    width: 561,
    height: 679,
    ratio: 'portrait'
  },
  {
    id: 'rebane-pilt',
    title: 'Rebane — fotoemail',
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'tombstone',
    width: 612,
    height: 408,
    ratio: 'landscape'
  },
  {
    id: 'oja-restaureerimine',
    title: 'Oja — vana platsi taastamine',
    material: 'Mixed granite',
    category: 'installation',
    imageBase: 'fence_with_entrance',
    width: 900,
    height: 600,
    ratio: 'landscape'
  },
  {
    id: 'kallas-solo',
    title: 'Kallas — soolomonument',
    material: 'Aurora Red',
    category: 'monuments',
    imageBase: 'fence',
    width: 1024,
    height: 1024,
    ratio: 'square'
  },
  {
    id: 'lill-piire',
    title: 'Lill — kõrgpiire ja lillealus',
    material: 'Lithuanian Black',
    category: 'fences',
    imageBase: 'framing',
    width: 1400,
    height: 933,
    ratio: 'square'
  },
  {
    id: 'kuld-ornament',
    title: 'Kuld — kuldgraveering',
    material: 'Karelian Black',
    category: 'engravings',
    imageBase: 'granite_bench',
    width: 700,
    height: 800,
    ratio: 'portrait'
  },
  {
    id: 'paju-paigaldus',
    title: 'Paju — paigaldus Narva-Jõesuus',
    material: 'Indian Aurora',
    category: 'installation',
    imageBase: 'bench',
    width: 800,
    height: 600,
    ratio: 'landscape'
  }
];
