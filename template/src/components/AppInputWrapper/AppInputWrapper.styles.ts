import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS

  return StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: vs(5)
    },
    label: {
      fontSize: ms(14),
      fontFamily: FONTS.regular,
      color: colors.black,
      marginBottom: vs(5),
      marginLeft: hs(5)
    },
    error: {
      fontSize: ms(12),
      fontFamily: FONTS.regular,
      color: colors.red,
      marginTop: vs(5),
      marginLeft: hs(5)
    }
  })
}
