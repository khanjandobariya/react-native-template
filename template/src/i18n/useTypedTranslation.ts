import {useTranslation as useI18nTranslation} from 'react-i18next'

import type {TranslationKey, TypedTFunction} from './types'

/**
 * Type-safe version of useTranslation hook
 * Returns a typed `t` function that only accepts valid translation keys
 *
 * @example
 * ```tsx
 * const { t } = useTypedTranslation()
 * t('ALFA_1')  // ✅ Valid
 * t('INVALID') // ❌ TypeScript error
 * ```
 */
export const useTypedTranslation = (): {t: TypedTFunction} => {
  const {t: i18nT} = useI18nTranslation()

  // eslint-disable-next-line custom-rules/function-naming-conventions
  const t: TypedTFunction = (key: TranslationKey, options?: Record<string, unknown>) => {
    return i18nT(key, options)
  }

  return {t}
}

// Re-export types for convenience
export type {TranslationKey, TypedTFunction} from './types'
