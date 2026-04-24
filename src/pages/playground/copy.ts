import type { Locale } from '../../types';

export interface UiCopy {
  viewAngle: string;
  modelCaption: string;
  optionalLabel: string;
  consultationButton: string;
}

export function getUiCopy(locale: Locale): UiCopy {
  if (locale === 'ru') {
    return {
      viewAngle: 'Угол обзора',
      modelCaption: 'Интерактивный 2D/3D предпросмотр',
      optionalLabel: 'Предпросмотр (опционально)',
      consultationButton: 'Получить консультацию по этому варианту'
    };
  }

  if (locale === 'et') {
    return {
      viewAngle: 'Vaatenurk',
      modelCaption: 'Interaktiivne 2D/3D eelvaade',
      optionalLabel: 'Eelvaade (valikuline)',
      consultationButton: 'Soovin konsultatsiooni selle variandi kohta'
    };
  }

  return {
    viewAngle: 'View angle',
    modelCaption: 'Interactive 2D/3D preview',
    optionalLabel: 'Preview (optional)',
    consultationButton: 'Get consultation for this option'
  };
}
