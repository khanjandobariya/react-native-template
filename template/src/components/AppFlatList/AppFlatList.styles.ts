import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {vs} = RS
  return StyleSheet.create({
    endOfFeed: {
      paddingVertical: vs(15),
      alignItems: 'center'
    },
    feedsListContainer: {
      paddingVertical: vs(10)
    },
    devider: {
      height: vs(1),
      backgroundColor: colors.deviderColor
    }
  })
}
