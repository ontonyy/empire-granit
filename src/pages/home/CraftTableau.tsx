interface ServiceShort {
  title: string;
  body: string;
}

interface CraftTableauProps {
  eyebrow: string;
  title: string;
  services: ServiceShort[];
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
            <img src="/images/examples/framing.png" alt="" loading="eager" />
          </div>
          <div className="home-craft__photo">
            <img src="/images/examples/granite_fence.png" alt="" loading="eager" />
          </div>
          <div className="home-craft__photo">
            <img src="/images/examples/stone_plate.png" alt="" loading="eager" />
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
