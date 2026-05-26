import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminGuard, clearAdminSession } from '../components/AdminGuard';
import type { AdminEventFilter } from '../lib/analytics-summary';
import type { Locale } from '../types';
import { FILTER_LABELS, getEventLabel } from './admin/copy';
import { useAnalyticsSummary } from './admin/use-analytics-summary';

interface AdminPageProps {
  locale: Locale;
}

export function AdminPage({ locale }: AdminPageProps) {
  const { summary, isLoading, error, reload } = useAnalyticsSummary();
  const [activeFilter, setActiveFilter] = useState<AdminEventFilter>('all');

  return (
    <AdminGuard>
      <section className="admin-page-shell">
        <div className="admin-page-header">
          <div>
            <span className="section-kicker">Админ-панель</span>
            <h1>Обзор активности сайта</h1>
            <p>
              Здесь собрана общая аналитика из Firestore: просмотры страниц, обращения,
              действия в галерее и интерес к пакетам цен от всех посетителей сайта.
            </p>
          </div>

          <div className="admin-page-actions">
            <button type="button" className="hero-secondary" onClick={() => void reload()}>
              Обновить
            </button>
            <Link className="hero-secondary" to={`/${locale}/`}>
              На сайт
            </Link>
            <button
              type="button"
              className="hero-primary"
              onClick={() => {
                clearAdminSession();
                window.location.reload();
              }}
            >
              Выйти
            </button>
          </div>
        </div>

        {error ? <p className="admin-login-error">{error}</p> : null}
        {isLoading ? <p className="admin-loading-state">Загрузка аналитики...</p> : null}

        <section className="admin-stat-grid">
          <article className="admin-stat-card">
            <span>Просмотры страниц</span>
            <strong>{summary.totalPageViews}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Клики по телефону</span>
            <strong>{summary.callClicks}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Клики по WhatsApp</span>
            <strong>{summary.whatsappClicks}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Отправки форм</span>
            <strong>{summary.formSubmissions}</strong>
          </article>
        </section>

        <section className="admin-dashboard-grid">
          <article className="admin-panel">
            <h2>Популярные категории галереи</h2>
            <div className="admin-list">
              {summary.galleryCategories.length ? (
                summary.galleryCategories.map((item) => (
                  <div key={item.key} className="admin-list-row">
                    <span>{item.key}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))
              ) : (
                <p className="admin-empty-state">Просмотров категорий галереи пока нет.</p>
              )}
            </div>
          </article>

          <article className="admin-panel">
            <h2>Самые выбранные пакеты</h2>
            <div className="admin-list">
              {summary.pricePackages.length ? (
                summary.pricePackages.map((item) => (
                  <div key={item.key} className="admin-list-row">
                    <span>{item.key}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))
              ) : (
                <p className="admin-empty-state">Выборов пакетов пока нет.</p>
              )}
            </div>
          </article>
        </section>

        <section className="admin-panel admin-events-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Последние действия</h2>
              <p>Можно отдельно посмотреть формы, галерею, цены или весь поток действий.</p>
            </div>
            <div className="admin-filter-bar" role="tablist" aria-label="Фильтр действий аналитики">
              {Object.entries(FILTER_LABELS).map(([filterKey, label]) => (
                <button
                  key={filterKey}
                  type="button"
                  className={`admin-filter-chip ${activeFilter === filterKey ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filterKey as AdminEventFilter)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-list">
            {summary.filteredEvents[activeFilter].length ? (
              summary.filteredEvents[activeFilter].map((event, index) => (
                  <div key={`${event.timestamp}-${event.eventName}-${index}`} className="admin-event-row">
                    <div>
                      <strong>{getEventLabel(event.eventName)}</strong>
                      <span>{event.propsSummary}</span>
                    </div>
                    <time>{event.timeLabel}</time>
                  </div>
                ))
            ) : (
              <p className="admin-empty-state">Для этого фильтра пока нет данных.</p>
            )}
          </div>
        </section>
      </section>
    </AdminGuard>
  );
}
