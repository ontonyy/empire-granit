interface ServicePictureProps {
  name: string;
  alt: string;
}

const KNOWN = ['craft-framing', 'craft-fence', 'craft-plate'];

export function ServicePicture({ name, alt }: ServicePictureProps) {
  let actual = name;
  if (!KNOWN.includes(name)) {
    if (typeof console !== 'undefined') {
      console.warn(`[ServicesPage] missing image "${name}", falling back to ${KNOWN[0]}`);
    }
    actual = KNOWN[0];
  }
  const base = `/images/n3/${actual}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-1x.avif 700w, ${base}-2x.avif 1400w`} sizes="(min-width: 1024px) 40vw, 100vw" />
      <source type="image/webp" srcSet={`${base}-1x.webp 700w, ${base}-2x.webp 1400w`} sizes="(min-width: 1024px) 40vw, 100vw" />
      <img
        src={`${base}-2x.jpg`}
        srcSet={`${base}-1x.jpg 700w, ${base}-2x.jpg 1400w`}
        sizes="(min-width: 1024px) 40vw, 100vw"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
