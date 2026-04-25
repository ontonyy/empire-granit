import { useState, type ReactNode } from 'react';
import { AdminLoginCard } from './admin/AdminLoginCard';
import { hasAdminSession } from './admin/session';

export { clearAdminSession, hasAdminSession } from './admin/session';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [isUnlocked, setIsUnlocked] = useState(hasAdminSession());

  if (isUnlocked) {
    return <>{children}</>;
  }

  return <AdminLoginCard onUnlock={() => setIsUnlocked(true)} />;
}
