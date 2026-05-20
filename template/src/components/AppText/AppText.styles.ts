import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms} = RS
  return StyleSheet.create({
    h1: {
      fontFamily: FONTS.extraBold,
      fontSize: ms(26),
      color: colors.white
    },
    h2: {
      fontFamily: FONTS.bold,
      fontSize: ms(22),
      color: colors.white
    },
    h3: {
      fontFamily: FONTS.bold,
      fontSize: ms(18),
      color: colors.white
    },
    bodyLarge: {
      fontFamily: FONTS.medium,
      fontSize: ms(16),
      color: colors.white
    },
    bodyNormal: {
      fontFamily: FONTS.regular,
      fontSize: ms(14),
      color: colors.white
    },
    bodyNormalMedium: {
      fontFamily: FONTS.medium,
      fontSize: ms(16),
      color: colors.white
    },
    bodyNormalBold: {
      fontFamily: FONTS.bold,
      fontSize: ms(14),
      color: colors.white
    },
    bodyNormalExtraBold: {
      fontFamily: FONTS.extraBold,
      fontSize: ms(14),
      color: colors.white
    }
  })
}

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLarge'
  | 'bodyNormal'
  | 'bodyNormalMedium'
  | 'bodyNormalBold'
  | 'bodyNormalExtraBold'

export const TYPOGRAPHY: Record<TypographyVariant, TypographyVariant> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  bodyLarge: 'bodyLarge',
  bodyNormal: 'bodyNormal',
  bodyNormalMedium: 'bodyNormalMedium',
  bodyNormalBold: 'bodyNormalBold',
  bodyNormalExtraBold: 'bodyNormalExtraBold'
}
