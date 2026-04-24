import { Navigate, useParams } from 'react-router-dom';
import { AdminPage } from '../pages/AdminPage';
import { LOCALES } from '../routing';
import type { Locale } from '../types';

export function AdminRoute() {
  const params = useParams();
  const locale = params.locale as Locale | undefined;

  if (!locale || !LOCALES.includes(locale)) {
    return <Navigate to="/ru/" replace />;
  }

  return <AdminPage locale={locale} />;
}
