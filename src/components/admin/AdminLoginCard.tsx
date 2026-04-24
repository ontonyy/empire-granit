import { useState } from 'react';
import { siteConfig } from '../../config/site';
import { setAdminSession } from './session';

interface AdminLoginCardProps {
  onUnlock: () => void;
}

export function AdminLoginCard({ onUnlock }: AdminLoginCardProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
              setAdminSession();
              setError('');
              onUnlock();
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
