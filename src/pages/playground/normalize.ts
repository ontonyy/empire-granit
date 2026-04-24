export type ShapeKind = 'straight' | 'arch' | 'wave';
export type MaterialKind = 'black' | 'gray' | 'marble';
export type FinishKind = 'polished' | 'matte' | 'mixed';

export function normalizeShape(value: string): ShapeKind {
  const normalized = value.toLowerCase();
  if (normalized.includes('арка') || normalized.includes('arch') || normalized.includes('kaar')) {
    return 'arch';
  }

  if (normalized.includes('волна') || normalized.includes('wave') || normalized.includes('laine')) {
    return 'wave';
  }

  return 'straight';
}

export function normalizeMaterial(value: string): MaterialKind {
  const normalized = value.toLowerCase();
  if (normalized.includes('мрам') || normalized.includes('marble') || normalized.includes('marmor')) {
    return 'marble';
  }

  if (normalized.includes('сер') || normalized.includes('gray') || normalized.includes('grey') || normalized.includes('hall')) {
    return 'gray';
  }

  return 'black';
}

export function normalizeFinish(value: string): FinishKind {
  const normalized = value.toLowerCase();
  if (
    normalized.includes('комбин') ||
    normalized.includes('komb') ||
    normalized.includes('mixed')
  ) {
    return 'mixed';
  }

  if (normalized.includes('матов') || normalized.includes('matt') || normalized.includes('matte')) {
    return 'matte';
  }

  return 'polished';
}

export function getMaterialPalette(material: MaterialKind) {
  if (material === 'marble') {
    return {
      front: '#ece8e1',
      side: '#d5cfc6',
      top: '#f4efe8',
      base: '#b7ac9e'
    };
  }

  if (material === 'gray') {
    return {
      front: '#676c72',
      side: '#4e535a',
      top: '#7e848c',
      base: '#70757c'
    };
  }

  return {
    front: '#2f333a',
    side: '#1f242b',
    top: '#3e434b',
    base: '#4a4f58'
  };
}
