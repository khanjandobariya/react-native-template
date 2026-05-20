import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs} = RS
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      paddingHorizontal: hs(15),
      paddingVertical: vs(10)
    }
  })
}
