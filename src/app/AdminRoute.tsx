import { Suspense, lazy } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LOCALES } from '../routing';
import type { Locale } from '../types';

const AdminPage = lazy(() =>
  import('../pages/AdminPage').then((m) => ({ default: m.AdminPage }))
);

export function AdminRoute() {
  const params = useParams();
  const locale = params.locale as Locale | undefined;

  if (!locale || !LOCALES.includes(locale)) {
    return <Navigate to="/ru/" replace />;
  }

  return (
    <Suspense fallback={null}>
      <AdminPage locale={locale} />
    </Suspense>
  );
}
