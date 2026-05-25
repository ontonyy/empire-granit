import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { LOCALES, buildLocalizedPath } from '../routing';
import type { Locale, RouteKey } from '../types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  routeKey: RouteKey;
}

export function LanguageSwitcher({ currentLocale, routeKey }: LanguageSwitcherProps) {
  const location = useLocation();
  const currentContent = getLocaleContent(currentLocale);

  return (
    <nav className="language-switcher" aria-label={currentContent.layout.languageSwitcher}>
      {LOCALES.map((locale, idx) => {
        const label = getLocaleContent(locale).localeLabel;
        const to = `${buildLocalizedPath(locale, routeKey)}${location.search}${location.hash}`;
        const isActive = locale === currentLocale;

        return (
          <Fragment key={locale}>
            {idx > 0 ? <span className="lang-sep" aria-hidden="true">·</span> : null}
            <Link
              className={isActive ? 'lang-link is-active' : 'lang-link'}
              to={to}
              lang={locale}
              hrefLang={locale}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
