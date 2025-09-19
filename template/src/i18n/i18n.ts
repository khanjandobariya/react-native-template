import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './locales/en.json'
import hindi from './locales/hindi.json'

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en,
    hindi
  },
  interpolation: {
    escapeValue: false
  }
})

export const translate: (str: string) => string = (str: string): string => {
  return i18n.t(str)
}

export default i18n
