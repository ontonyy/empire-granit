import type { AdminEventFilter, AnalyticsSummary } from '../../lib/analytics';

export const EMPTY_SUMMARY: AnalyticsSummary = {
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

export const FILTER_LABELS: Record<AdminEventFilter, string> = {
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

export function getEventLabel(eventName: string): string {
  return EVENT_LABELS[eventName] || eventName;
}
