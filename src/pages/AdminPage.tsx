import { Link } from 'react-router-dom';
import { AdminGuard, clearAdminSession } from '../components/AdminGuard';
import { getAnalyticsSummary } from '../lib/analytics';
import type { Locale } from '../types';

interface AdminPageProps {
  locale: Locale;
}

export function AdminPage({ locale }: AdminPageProps) {
  const summary = getAnalyticsSummary();

  return (
    <AdminGuard>
      <section className="admin-page-shell">
        <div className="admin-page-header">
          <div>
            <span className="section-kicker">Admin Dashboard</span>
            <h1>Site activity overview</h1>
            <p>
              This dashboard shows analytics stored locally in this browser. It is useful for
              validating traffic and interaction patterns during development and basic deployment
              testing.
            </p>
          </div>

          <div className="admin-page-actions">
            <Link className="hero-secondary" to={`/${locale}/`}>
              Back to site
            </Link>
            <button
              type="button"
              className="hero-primary"
              onClick={() => {
                clearAdminSession();
                window.location.reload();
              }}
            >
              Log out
            </button>
          </div>
        </div>

        <section className="admin-stat-grid">
          <article className="admin-stat-card">
            <span>Total page views</span>
            <strong>{summary.totalPageViews}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Call clicks</span>
            <strong>{summary.callClicks}</strong>
          </article>
          <article className="admin-stat-card">
            <span>WhatsApp clicks</span>
            <strong>{summary.whatsappClicks}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Form submissions</span>
            <strong>{summary.formSubmissions}</strong>
          </article>
        </section>

        <section className="admin-dashboard-grid">
          <article className="admin-panel">
            <h2>Popular gallery categories</h2>
            <div className="admin-list">
              {summary.galleryCategories.length ? (
                summary.galleryCategories.map((item) => (
                  <div key={item.key} className="admin-list-row">
                    <span>{item.key}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))
              ) : (
                <p className="admin-empty-state">No gallery category views recorded yet.</p>
              )}
            </div>
          </article>

          <article className="admin-panel">
            <h2>Recent events</h2>
            <div className="admin-list">
              {summary.recentEvents.length ? (
                summary.recentEvents.map((event, index) => (
                  <div key={`${event.timestamp}-${event.eventName}-${index}`} className="admin-event-row">
                    <div>
                      <strong>{event.eventName}</strong>
                      <span>{event.propsSummary}</span>
                    </div>
                    <time>{event.timeLabel}</time>
                  </div>
                ))
              ) : (
                <p className="admin-empty-state">No tracked events yet.</p>
              )}
            </div>
          </article>
        </section>
      </section>
    </AdminGuard>
  );
}
