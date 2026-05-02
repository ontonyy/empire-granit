import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BaseProps {
  title: ReactNode;
  description?: ReactNode;
  cta?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

type LinkCard = BaseProps & {
  to: string;
  href?: never;
};

type AnchorCard = BaseProps & {
  href: string;
  to?: never;
};

type StaticCard = BaseProps & {
  to?: undefined;
  href?: undefined;
};

export type CardProps = LinkCard | AnchorCard | StaticCard;

function CardInner({ title, description, cta, imageSrc, imageAlt }: BaseProps) {
  return (
    <>
      <div className="ui-card__media">
        <img src={imageSrc} alt={imageAlt} loading="lazy" />
      </div>
      <div className="ui-card__body">
        <h3 className="ui-card__title">{title}</h3>
        {description ? <p className="ui-card__desc">{description}</p> : null}
        {cta ? <span className="ui-card__cta">{cta} →</span> : null}
      </div>
    </>
  );
}

export function Card(props: CardProps) {
  const cls = ['ui-card', (props as LinkCard).to || (props as AnchorCard).href ? 'is-interactive' : '', props.className]
    .filter(Boolean)
    .join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        <CardInner {...props} />
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={cls}>
        <CardInner {...props} />
      </a>
    );
  }

  return (
    <article className={cls}>
      <CardInner {...props} />
    </article>
  );
}
