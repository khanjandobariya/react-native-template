import type enTranslations from './locales/en.json'

// Extract the translation object structure from the JSON
export type TranslationObject = typeof enTranslations

// Helper type to extract nested keys as dot-notation strings
type KeyOfNested<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${KeyOfNested<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

// Extract keys from the "translation" namespace
// Since react-i18next uses "translation" as default namespace,
// keys are accessed as "ALFA_1" not "translation.ALFA_1"
export type TranslationNamespace = TranslationObject['translation']

// Extract all valid translation keys
export type TranslationKey = KeyOfNested<TranslationNamespace>

// Type for the translation function
export type TypedTFunction = (key: TranslationKey, options?: Record<string, unknown>) => string
