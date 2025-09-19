import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {vs} = RS
  return StyleSheet.create({
    container: {
      marginVertical: vs(5),
      width: '100%'
    },
    errorText: {
      color: colors.redDarkB1
    },
    labelText: {
      color: colors.blueDark00
    }
  })
}
