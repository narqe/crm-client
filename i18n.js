import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./translations/en/en.json";
import es from "./translations/es/es.json";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: { translation: en },
    es: { translation: es }
};

const options = {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lng'
}

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        fallbackLng: 'en',
        detection: options,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;