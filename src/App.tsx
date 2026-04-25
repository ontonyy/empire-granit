import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoute } from './app/AdminRoute';
import { LocaleRouteResolver } from './app/LocaleRouteResolver';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ru/" replace />} />
      <Route path="/__empire-admin" element={<Navigate to="/ru/__empire-admin" replace />} />
      <Route path="/:locale/__empire-admin" element={<AdminRoute />} />
      <Route path="/:locale/*" element={<LocaleRouteResolver />} />
      <Route path="*" element={<Navigate to="/ru/" replace />} />
    </Routes>
  );
}
