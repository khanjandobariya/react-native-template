import {StyleSheet} from 'react-native'

import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.accentWhite
    },
    container: {
      flex: 1,
      backgroundColor: colors.bgColor
    }
  })
}
