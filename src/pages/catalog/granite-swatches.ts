import type { GraniteSwatch, Locale } from '../../types';

export function getExtraGraniteSwatches(locale: Locale): GraniteSwatch[] {
  if (locale === 'ru') {
    return [
      { id: 'ru-extra-light-blue', name: 'Светло-голубой', textureKey: 'light-blue-granite' },
      { id: 'ru-extra-orange', name: 'Оранжевый', textureKey: 'orange-granite' }
    ];
  }

  if (locale === 'et') {
    return [
      { id: 'et-extra-light-blue', name: 'Helesinine', textureKey: 'light-blue-granite' },
      { id: 'et-extra-orange', name: 'Oranž', textureKey: 'orange-granite' }
    ];
  }

  return [
    { id: 'en-extra-light-blue', name: 'Light Blue', textureKey: 'light-blue-granite' },
    { id: 'en-extra-orange', name: 'Orange', textureKey: 'orange-granite' }
  ];
}

export function withAdditionalGraniteSwatches(locale: Locale, swatches: GraniteSwatch[]): GraniteSwatch[] {
  const existingKeys = new Set(swatches.map((swatch) => swatch.textureKey));
  return [...swatches, ...getExtraGraniteSwatches(locale).filter((swatch) => !existingKeys.has(swatch.textureKey))];
}
