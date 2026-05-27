interface ServicePictureProps {
  name: string;
  alt: string;
}

interface ServiceAsset {
  w1: number;
  w2: number;
  h2: number;
}

const ASSETS: Record<string, ServiceAsset> = {
  'service-framing': { w1: 700, w2: 1400, h2: 934 },
  'service-fence': { w1: 450, w2: 900, h2: 706 },
  'service-plate': { w1: 450, w2: 900, h2: 1090 }
};

export function ServicePicture({ name, alt }: ServicePictureProps) {
  let actual = name;
  if (!(actual in ASSETS)) {
    if (typeof console !== 'undefined') {
      console.warn(`[ServicesPage] missing image "${name}", falling back to service-framing`);
    }
    actual = 'service-framing';
  }
  const { w1, w2, h2 } = ASSETS[actual];
  const base = `${import.meta.env.BASE_URL}images/n3/${actual}`;
  const sizes = '(min-width: 1024px) 40vw, 100vw';
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-1x.avif ${w1}w, ${base}-2x.avif ${w2}w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-1x.webp ${w1}w, ${base}-2x.webp ${w2}w`} sizes={sizes} />
      <img
        src={`${base}-2x.jpg`}
        srcSet={`${base}-1x.jpg ${w1}w, ${base}-2x.jpg ${w2}w`}
        sizes={sizes}
        width={w2}
        height={h2}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
