import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminGuard, clearAdminSession } from '../components/AdminGuard';
import {
  getAnalyticsSummary,
  type AdminEventFilter,
  type AnalyticsSummary
} from '../lib/analytics';
import type { Locale } from '../types';

interface AdminPageProps {
  locale: Locale;
}

const EMPTY_SUMMARY: AnalyticsSummary = {
  totalPageViews: 0,
  callClicks: 0,
  whatsappClicks: 0,
  formSubmissions: 0,
  galleryCategories: [],
  pricePackages: [],
  filteredEvents: {
    all: [],
    forms: [],
    gallery: [],
    pricing: []
  },
  recentEvents: []
};

const FILTER_LABELS: Record<AdminEventFilter, string> = {
  all: 'Все действия',
  forms: 'Отправка форм',
  gallery: 'Галерея',
  pricing: 'Цены'
};

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Просмотр страницы',
  phone_click: 'Клик по телефону',
  whatsapp_click: 'Клик по WhatsApp',
  contact_form_submit: 'Отправка основной формы',
  callback_request_submit: 'Запрос обратного звонка',
  gallery_category_view: 'Просмотр категории галереи',
  pricing_page_view: 'Просмотр страницы цен',
  pricing_package_view: 'Просмотр пакета',
  pricing_package_select: 'Выбор пакета',
  playground_interaction: 'Действие в предпросмотре'
};

function getEventLabel(eventName: string): string {
  return EVENT_LABELS[eventName] || eventName;
}

export function AdminPage({ locale }: AdminPageProps) {
  const [summary, setSummary] = useState<AnalyticsSummary>(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<AdminEventFilter>('all');

  const loadSummary = async () => {
    setIsLoading(true);
    setError('');

    try {
      const nextSummary = await getAnalyticsSummary();
      setSummary(nextSummary);
    } catch (loadError) {
      console.error(loadError);
      setError('Не удалось загрузить данные аналитики из Firestore.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSummary();
  }, []);

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
            <button type="button" className="hero-secondary" onClick={() => void loadSummary()}>
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
