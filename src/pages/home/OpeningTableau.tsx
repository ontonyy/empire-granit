interface OpeningTableauProps {
  eyebrow: string;
  title: string;
}

export function OpeningTableau({ eyebrow, title }: OpeningTableauProps) {
  return (
    <section className="home-opening">
      <picture className="home-opening__picture">
        <source
          type="image/avif"
          srcSet="/images/n3/hero-1x.avif 1200w, /images/n3/hero-2x.avif 2400w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/n3/hero-1x.webp 1200w, /images/n3/hero-2x.webp 2400w"
          sizes="100vw"
        />
        <img
          className="home-opening__image"
          src="/images/n3/hero-2x.jpg"
          srcSet="/images/n3/hero-1x.jpg 1200w, /images/n3/hero-2x.jpg 2400w"
          sizes="100vw"
          width={2400}
          height={1350}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
        />
      </picture>
      <div className="home-opening__overlay" aria-hidden="true" />
      <div className="home-opening__copy">
        <span className="home-opening__eyebrow">{eyebrow}</span>
        <h1 className="home-opening__title">{title}</h1>
      </div>
    </section>
  );
}
