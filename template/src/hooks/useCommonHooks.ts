import {useTypedTranslation} from '@/i18n'
import type {ColorType} from '@/theme/Theme'

import useColor from './useColor'
import useResponsiveHook, {type RSType} from './useResponsiveHook'

const useCommonHooks = () => {
  const colors: ColorType = useColor()
  const RS: RSType = useResponsiveHook()
  const {t} = useTypedTranslation()
  return {
    colors,
    RS,
    t
  }
}

export default useCommonHooks
