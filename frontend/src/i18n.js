import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Язык, используемый, если выбранный или обнаруженный не поддерживается
    supportedLngs: ['en', 'pl', 'ua'], // Поддерживаемые языки
    debug: false, // Отключаем debug для избежания ошибок dotenv
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Динамический путь: в dev будет '/', в prod '/phonebook/'
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`,
      allowMultiLoading: false,
    },
    returnEmptyString: false,
    saveMissing: false,
  });

export default i18n;
