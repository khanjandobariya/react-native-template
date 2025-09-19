import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms} = RS
  return StyleSheet.create({
    h1: {
      fontFamily: FONTS.bold,
      fontSize: ms(20),
      color: colors.grayLight,
      lineHeight: ms(32)
    },
    h2: {
      fontFamily: FONTS.bold,
      fontSize: ms(16),
      color: colors.blueDarker,
      lineHeight: ms(22)
    },
    h3: {
      fontFamily: FONTS.bold,
      fontSize: ms(14),
      color: colors.blueDarker,
      lineHeight: ms(22)
    },
    h4: {
      fontFamily: FONTS.regular,
      fontSize: ms(14),
      color: colors.grayLight,
      lineHeight: ms(22)
    },
    h5: {
      fontFamily: FONTS.regular,
      fontSize: ms(12),
      color: colors.grayLight,
      lineHeight: ms(19)
    }
  })
}
