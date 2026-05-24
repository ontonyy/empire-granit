import { Helmet } from 'react-helmet-async';
import type { Locale } from '../types';

interface WorksPageProps {
  locale: Locale;
}

export function WorksPage(_props: WorksPageProps) {
  return (
    <>
      <Helmet>
        <title>Tööd | Empire Granit</title>
      </Helmet>
      <h1>Tööd</h1>
    </>
  );
}
