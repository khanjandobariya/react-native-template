import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: ms(30),
      paddingHorizontal: hs(20),
      paddingVertical: vs(20),
      borderWidth: 1,
      borderColor: colors.borderColor
    }
  })
}
