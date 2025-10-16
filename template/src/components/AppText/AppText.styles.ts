import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType} from '@/theme/Theme'

export const LH_FACT: number = 1.4

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms} = RS
  return StyleSheet.create({
    removeSpaces: {
      includeFontPadding: false
    },
    h1: {
      fontFamily: FONTS.bold,
      fontSize: ms(20),
      color: colors.grayLight,
      lineHeight: ms(20) * LH_FACT
    },
    h2: {
      fontFamily: FONTS.bold,
      fontSize: ms(16),
      color: colors.blueDarker,
      lineHeight: ms(16) * LH_FACT
    },
    h3: {
      fontFamily: FONTS.bold,
      fontSize: ms(14),
      color: colors.blueDarker,
      lineHeight: ms(14) * LH_FACT
    },
    h4: {
      fontFamily: FONTS.regular,
      fontSize: ms(14),
      color: colors.grayLight,
      lineHeight: ms(14) * LH_FACT
    },
    h5: {
      fontFamily: FONTS.regular,
      fontSize: ms(12),
      color: colors.grayLight,
      lineHeight: ms(12) * LH_FACT
    }
  })
}
