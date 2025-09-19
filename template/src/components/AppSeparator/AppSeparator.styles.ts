import {StyleSheet} from 'react-native'

import {type ColorType} from '@/theme/Theme'
import {scale, verticalScale} from '@/utils/Responsive'

export const myStyles = (colors: ColorType, isHorizontal: boolean, size: number) => {
  return StyleSheet.create({
    separator: {
      width: !isHorizontal ? '100%' : scale(size),
      height: !isHorizontal ? verticalScale(size) : '100%'
    }
  })
}
