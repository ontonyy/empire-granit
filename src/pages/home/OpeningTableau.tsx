interface OpeningTableauProps {
  eyebrow: string;
  title: string;
}

export function OpeningTableau({ eyebrow, title }: OpeningTableauProps) {
  return (
    <section className="home-opening">
      <img
        className="home-opening__image"
        src="/images/background.png"
        alt=""
        aria-hidden="true"
        loading="eager"
      />
      <div className="home-opening__overlay" aria-hidden="true" />
      <div className="home-opening__copy">
        <span className="home-opening__eyebrow">{eyebrow}</span>
        <h1 className="home-opening__title">{title}</h1>
      </div>
    </section>
  );
}
