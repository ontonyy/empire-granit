import { useMemo, useState } from 'react';
import type { GraniteSwatch, Locale, LocaleContent } from '../../types';
import { withAdditionalGraniteSwatches } from '../catalog/granite-swatches';

export type MemorialShapeId =
  | 'arched'
  | 'flat'
  | 'shouldered'
  | 'heart'
  | 'wave'
  | 'cross'
  | 'book'
  | 'oval';

export interface MemorialConfig {
  shapeId: MemorialShapeId;
  stoneId: string;
  finishId: 'polished' | 'honed' | 'flamed';
  letteringId: 'serif' | 'sans' | 'script' | 'caps';
  inscriptionName: string;
  inscriptionDates: string;
  addons: {
    vase: boolean;
    photo: boolean;
    ornament: boolean;
    candle: boolean;
    border: boolean;
  };
}

export const ADDON_IDS = ['vase', 'photo', 'ornament', 'candle', 'border'] as const;
export type AddonId = (typeof ADDON_IDS)[number];

export function buildPreviewSwatches(locale: Locale, content: LocaleContent): GraniteSwatch[] {
  const swatches = [...content.gallery.categories, ...content.gallery.catalogCategories].flatMap(
    (category) => category.graniteSwatches ?? []
  );
  const seen = new Set<string>();

  return withAdditionalGraniteSwatches(locale, swatches).filter((swatch) => {
    if (seen.has(swatch.textureKey)) {
      return false;
    }

    seen.add(swatch.textureKey);
    return true;
  });
}

export function useMemorialConfig(locale: Locale, content: LocaleContent, initialConfig?: Partial<MemorialConfig>) {
  const swatches = useMemo(() => buildPreviewSwatches(locale, content), [locale, content]);
  const defaultStone = swatches.find((swatch) => swatch.textureKey === 'black-granite') ?? swatches[0];
  const [config, setConfig] = useState<MemorialConfig>(() => {
    const defaults: MemorialConfig = {
      shapeId: 'arched',
      stoneId: defaultStone?.id ?? 'preview-black-granite',
      finishId: 'polished',
      letteringId: 'serif',
      inscriptionName: content.preview.sampleName,
      inscriptionDates: content.preview.sampleDates,
      addons: {
        vase: false,
        photo: false,
        ornament: false,
        candle: false,
        border: false
      }
    };

    return {
      ...defaults,
      ...initialConfig,
      addons: {
        ...defaults.addons,
        ...initialConfig?.addons
      }
    };
  });

  const selectedStone = swatches.find((swatch) => swatch.id === config.stoneId) ?? defaultStone ?? swatches[0];

  return {
    config,
    selectedStone,
    swatches,
    setShapeId: (shapeId: MemorialShapeId) => setConfig((current) => ({ ...current, shapeId })),
    setStoneId: (stoneId: string) => setConfig((current) => ({ ...current, stoneId })),
    setFinishId: (finishId: MemorialConfig['finishId']) => setConfig((current) => ({ ...current, finishId })),
    setLetteringId: (letteringId: MemorialConfig['letteringId']) => setConfig((current) => ({ ...current, letteringId })),
    setInscriptionName: (inscriptionName: string) => setConfig((current) => ({ ...current, inscriptionName })),
    setInscriptionDates: (inscriptionDates: string) => setConfig((current) => ({ ...current, inscriptionDates })),
    toggleAddon: (addonId: AddonId) =>
      setConfig((current) => ({
        ...current,
        addons: {
          ...current.addons,
          [addonId]: !current.addons[addonId]
        }
      }))
  };
}
