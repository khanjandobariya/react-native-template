import {StyleSheet} from 'react-native'

import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    }
  })
}
