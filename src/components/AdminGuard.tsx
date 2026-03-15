import { useState, type ReactNode } from 'react';
import { siteConfig } from '../config/site';

const ADMIN_SESSION_KEY = 'empire_admin_session';

interface AdminGuardProps {
  children: ReactNode;
}

export function hasAdminSession(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(ADMIN_SESSION_KEY) === '1';
}

export function clearAdminSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(hasAdminSession());

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <section className="admin-login-shell">
      <article className="admin-login-card">
        <span className="section-kicker">Empire Admin</span>
        <h1>Вход в админ-панель</h1>
        <p>
          Введите пароль, чтобы открыть статистику сайта: просмотры, клики, отправки форм,
          действия в галерее и интерес к ценам.
        </p>

        <form
          className="admin-login-form"
          onSubmit={(event) => {
            event.preventDefault();

            if (password === siteConfig.admin.password) {
              window.localStorage.setItem(ADMIN_SESSION_KEY, '1');
              setIsUnlocked(true);
              setError('');
              return;
            }

            setError('Неверный пароль.');
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите пароль"
            autoComplete="current-password"
            required
          />
          <button type="submit">Открыть панель</button>
        </form>

        {error ? <p className="admin-login-error">{error}</p> : null}
      </article>
    </section>
  );
}
