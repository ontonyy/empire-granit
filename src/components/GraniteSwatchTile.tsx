import type { GraniteSwatch } from '../types';

const GRANITE_TEXTURE_IMAGE_BY_KEY: Record<string, string> = {
  'grey-granite': '/images/granite-textures/grey.png',
  'red-granite': '/images/granite-textures/red.png',
  'black-granite': '/images/granite-textures/black.png',
  'green-granite': '/images/granite-textures/green.png',
  'white-granite': '/images/granite-textures/white.png',
  'brown-granite': '/images/granite-textures/bege.png',
  'blue-granite': '/images/granite-textures/blue.png',
  'light-blue-granite': '/images/granite-textures/light-blue.png',
  'orange-granite': '/images/granite-textures/orange.png',
  'violet-granite': '/images/granite-textures/purple.png'
};

function withBaseUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}${path}`;
}

interface GraniteSwatchTileProps {
  swatch: GraniteSwatch;
  className?: string;
}

export function getGraniteTextureImage(swatch: GraniteSwatch): string | undefined {
  const path = GRANITE_TEXTURE_IMAGE_BY_KEY[swatch.textureKey];
  return path ? withBaseUrl(path) : undefined;
}

export function GraniteSwatchTile({ swatch, className = '' }: GraniteSwatchTileProps) {
  const imageSrc = getGraniteTextureImage(swatch);

  return (
    <div className={`granite-swatch granite-texture-${swatch.textureKey} ${className}`.trim()}>
      {imageSrc ? <img src={imageSrc} alt={swatch.name} loading="lazy" className="granite-swatch-image" /> : null}
    </div>
  );
}
