import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms} = RS
  return StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    container: {
      flex: 1
    },
    textStyle: {
      fontSize: ms(14),
      fontFamily: FONTS.regular
    }
  })
}
