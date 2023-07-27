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
      interpolation: {
         escapeValue: false,
      },
      backend: {
         loadPath: '/client/src/locales/{{lng}}.json', // Путь к вашим файлам с переводами local (*.json)
         // loadPath: '/static/locales/{{lng}}.json', // Путь к вашим файлам с переводами server (*.json)
      },
   });

export default i18n;
