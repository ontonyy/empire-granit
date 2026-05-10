import type { Locale } from '../../types';

export interface ContactAssistCopy {
  detailsTitle: string;
  intentTitle: string;
  detailsPhone: string;
  detailsEmail: string;
  whatsappLabel: string;
  inquiryTitle: string;
  inquiryHint: string;
  packageInterestTemplate: string;
  optionalLabel: string;
  formLoading: string;
  formSuccess: string;
  formError: string;
  formRateLimit: string;
  sendAnother: string;
  errorNameRequired: string;
  errorPhoneInvalid: string;
  errorEmailInvalid: string;
  fileLabel: string;
  fileHelper: string;
}

export function getContactAssistContent(locale: Locale): ContactAssistCopy {
  if (locale === 'ru') {
    return {
      detailsTitle: 'Свяжитесь с нами',
      intentTitle: 'Что можно отправить',
      detailsPhone: 'Телефон',
      detailsEmail: 'E-mail',
      whatsappLabel: 'Написать в WhatsApp',
      inquiryTitle: 'Оставить заявку',
      inquiryHint: 'Укажите имя и телефон — этого достаточно. При желании добавьте e-mail и сообщение.',
      packageInterestTemplate: 'Здравствуйте! Я заинтересован в пакете "{name}". Пожалуйста, расскажите подробнее.',
      optionalLabel: '(необязательно)',
      formLoading: 'Отправка…',
      formSuccess: 'Спасибо! Ваше сообщение отправлено.',
      formError: 'Произошла ошибка. Пожалуйста, попробуйте позже.',
      formRateLimit: 'Слишком много заявок. Попробуйте через несколько минут.',
      sendAnother: 'Отправить ещё одну',
      errorNameRequired: 'Укажите имя.',
      errorPhoneInvalid: 'Введите корректный телефон.',
      errorEmailInvalid: 'Проверьте e-mail.',
      fileLabel: 'Фото участка',
      fileHelper: 'Можно выбрать фото участка или примера. Если отправка файлов недоступна, укажите детали в сообщении или отправьте фото по e-mail.'
    };
  }

  if (locale === 'et') {
    return {
      detailsTitle: 'Võta ühendust',
      intentTitle: 'Mida saab saata',
      detailsPhone: 'Telefon',
      detailsEmail: 'E-post',
      whatsappLabel: 'Kirjuta WhatsAppis',
      inquiryTitle: 'Jäta päring',
      inquiryHint: 'Piisab nimest ja telefoninumbrist. Soovi korral lisa e-post ja sõnum.',
      packageInterestTemplate: 'Tere! Olen huvitatud "{name}" paketist. Palun saata täpsemat infot.',
      optionalLabel: '(valikuline)',
      formLoading: 'Saadan…',
      formSuccess: 'Aitäh! Teie teade on saadetud.',
      formError: 'Tekkis viga. Palun proovige hiljem uuesti.',
      formRateLimit: 'Liiga palju päringuid. Palun proovi paari minuti pärast.',
      sendAnother: 'Saada uus',
      errorNameRequired: 'Sisestage nimi.',
      errorPhoneInvalid: 'Sisestage korrektne telefon.',
      errorEmailInvalid: 'Kontrollige e-posti aadressi.',
      fileLabel: 'Platsi fotod',
      fileHelper: 'Võite valida platsi või näidise foto. Kui failide saatmine ei ole saadaval, lisage detailid sõnumisse või saatke foto e-postiga.'
    };
  }

  return {
    detailsTitle: 'Get in Touch',
    intentTitle: 'What to send',
    detailsPhone: 'Phone',
    detailsEmail: 'E-mail',
    whatsappLabel: 'Write on WhatsApp',
    inquiryTitle: 'Leave a Request',
    inquiryHint: 'Name and phone are enough. Add email and a message if you want.',
    packageInterestTemplate: 'Hello! I am interested in the "{name}" package. Please provide more details.',
    optionalLabel: '(optional)',
    formLoading: 'Sending…',
    formSuccess: 'Thank you! Your message has been sent.',
    formError: 'An error occurred. Please try again later.',
    formRateLimit: 'Too many requests. Please try again in a few minutes.',
    sendAnother: 'Send another',
    errorNameRequired: 'Please enter your name.',
    errorPhoneInvalid: 'Please enter a valid phone number.',
    errorEmailInvalid: 'Please check the email address.',
    fileLabel: 'Site photos',
    fileHelper: 'You can choose site or reference photos. If file upload is unavailable, add details in the message or send photos by email.'
  };
}
