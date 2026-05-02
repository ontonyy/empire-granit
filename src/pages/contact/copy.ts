import type { Locale } from '../../types';

export interface ContactAssistCopy {
  detailsTitle: string;
  intentTitle: string;
  detailsPhone: string;
  detailsEmail: string;
  whatsappLabel: string;
  callbackTitle: string;
  callbackHint: string;
  callbackButton: string;
  inquiryTitle: string;
  inquiryHint: string;
  inquiryButton: string;
  packageInterestTemplate: string;
  formSuccess: string;
  formError: string;
}

export function getContactAssistContent(locale: Locale): ContactAssistCopy {
  if (locale === 'ru') {
    return {
      detailsTitle: 'Свяжитесь с нами',
      intentTitle: 'Что можно отправить',
      detailsPhone: 'Телефон',
      detailsEmail: 'E-mail',
      whatsappLabel: 'Написать в WhatsApp',
      callbackTitle: 'Обратный звонок',
      callbackHint: 'Оставьте номер, и мы перезвоним вам.',
      callbackButton: 'Жду звонка',
      inquiryTitle: 'Задать вопрос',
      inquiryHint: 'Оставьте сообщение или задайте вопрос.',
      inquiryButton: 'Отправить',
      packageInterestTemplate: 'Здравствуйте! Я заинтересован в пакете "{name}". Пожалуйста, расскажите подробнее.',
      formSuccess: 'Спасибо! Ваше сообщение отправлено.',
      formError: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    };
  }

  if (locale === 'et') {
    return {
      detailsTitle: 'Võta ühendust',
      intentTitle: 'Mida saab saata',
      detailsPhone: 'Telefon',
      detailsEmail: 'E-post',
      whatsappLabel: 'Kirjuta WhatsAppis',
      callbackTitle: 'Tagasihelistamine',
      callbackHint: 'Jätke oma number ja me helistame teile.',
      callbackButton: 'Telli kõne',
      inquiryTitle: 'Jäta päring',
      inquiryHint: 'Esitage küsimus või kirjeldage oma soove.',
      inquiryButton: 'Saada',
      packageInterestTemplate: 'Tere! Olen huvitatud "{name}" paketist. Palun saata täpsemat infot.',
      formSuccess: 'Aitäh! Teie teade on saadetud.',
      formError: 'Tekkis viga. Palun proovige hiljem uuesti.'
    };
  }

  return {
    detailsTitle: 'Get in Touch',
    intentTitle: 'What to send',
    detailsPhone: 'Phone',
    detailsEmail: 'E-mail',
    whatsappLabel: 'Write on WhatsApp',
    callbackTitle: 'Request a Callback',
    callbackHint: 'Leave your details and we will reach out.',
    callbackButton: 'Leave a Request',
    inquiryTitle: 'Leave a Request',
    inquiryHint: 'Have a specific question or request?',
    inquiryButton: 'Send Message',
    packageInterestTemplate: 'Hello! I am interested in the "{name}" package. Please provide more details.',
    formSuccess: 'Thank you! Your message has been sent.',
    formError: 'An error occurred. Please try again later.'
  };
}
