import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './locales/en.json'
import type {TranslationKey, TypedTFunction} from './types'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en
  },
  interpolation: {
    escapeValue: false
  }
})

// Type-safe translation function
export const translate: TypedTFunction = (
  key: TranslationKey,
  options?: Record<string, unknown>
): string => {
  return i18n.t(key, options)
}

// Type-safe t function (alias for translate)
// eslint-disable-next-line custom-rules/constant-static-data
export const t: TypedTFunction = translate

export default i18n
