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

  return (
    <div className="language-switcher" aria-label="Language switcher">
      {LOCALES.map((locale) => {
        const label = getLocaleContent(locale).localeLabel;
        const to = `${buildLocalizedPath(locale, routeKey)}${location.search}${location.hash}`;

        return (
          <Link
            key={locale}
            className={locale === currentLocale ? 'lang-link active' : 'lang-link'}
            to={to}
            lang={locale}
            hrefLang={locale}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
