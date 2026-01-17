import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../public/locales/en.json';
import plTranslations from '../public/locales/pl.json';
import uaTranslations from '../public/locales/ua.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pl: { translation: plTranslations },
      ua: { translation: uaTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl', 'ua'],
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    saveMissing: false,
  });

export default i18n;
