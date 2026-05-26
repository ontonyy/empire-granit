interface ServiceShort {
  title: string;
  body: string;
}

interface CraftTableauProps {
  eyebrow: string;
  title: string;
  services: ServiceShort[];
}

interface CraftPhoto {
  name: 'craft-framing' | 'craft-fence' | 'craft-plate';
  width: number;
  height: number;
  sizes: string;
}

const PHOTOS: CraftPhoto[] = [
  { name: 'craft-framing', width: 1400, height: 1750, sizes: '(min-width: 1024px) 50vw, 100vw' },
  { name: 'craft-fence', width: 900, height: 900, sizes: '(min-width: 1024px) 25vw, 50vw' },
  { name: 'craft-plate', width: 900, height: 900, sizes: '(min-width: 1024px) 25vw, 50vw' }
];

function CraftPicture({ photo }: { photo: CraftPhoto }) {
  const { name, width, height, sizes } = photo;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/images/n3/${name}-1x.avif ${width / 2}w, /images/n3/${name}-2x.avif ${width}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/images/n3/${name}-1x.webp ${width / 2}w, /images/n3/${name}-2x.webp ${width}w`}
        sizes={sizes}
      />
      <img
        src={`/images/n3/${name}-2x.jpg`}
        srcSet={`/images/n3/${name}-1x.jpg ${width / 2}w, /images/n3/${name}-2x.jpg ${width}w`}
        sizes={sizes}
        width={width}
        height={height}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export function CraftTableau({ eyebrow, title, services }: CraftTableauProps) {
  return (
    <section id="services" className="home-craft">
      <div className="ui-container">
        <header className="home-craft__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-craft__title">{title}</h2>
        </header>
        <div className="home-craft__grid">
          <div className="home-craft__photo home-craft__photo--big">
            <CraftPicture photo={PHOTOS[0]} />
          </div>
          <div className="home-craft__photo">
            <CraftPicture photo={PHOTOS[1]} />
          </div>
          <div className="home-craft__photo">
            <CraftPicture photo={PHOTOS[2]} />
          </div>
        </div>
        <div className="home-craft__services">
          {services.map((s) => (
            <article key={s.title} className="home-craft__service">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
