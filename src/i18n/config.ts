import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import hi from './hi.json';
import ta from './ta.json';
import te from './te.json';
import ka from './ka.json';
import bn from './bn.json';
import mr from './mr.json';
import gu from './gu.json';
import pa from './pa.json';
import ml from './ml.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  ka: { translation: ka },
  bn: { translation: bn },
  mr: { translation: mr },
  gu: { translation: gu },
  pa: { translation: pa },
  ml: { translation: ml },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
