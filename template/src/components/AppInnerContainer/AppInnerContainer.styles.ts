import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {vs} = RS
  return StyleSheet.create({
    innerContainer: {
      flex: 1,
      paddingHorizontal: vs(20)
    }
  })
}
