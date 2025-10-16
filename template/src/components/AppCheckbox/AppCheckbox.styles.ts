import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms} = RS
  return StyleSheet.create({
    leftText: {
      color: colors.blueDarker,
      fontFamily: FONTS.regular,
      fontSize: ms(16)
    }
  })
}
