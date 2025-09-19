import {StyleSheet} from 'react-native'

import {FONTS} from '@/theme/Fonts'
import {type ColorType} from '@/theme/Theme'
import {moderateScale} from '@/utils/Responsive'

export const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    leftText: {
      color: colors.blueDarker,
      fontFamily: FONTS.regular,
      fontSize: moderateScale(16)
    }
  })
}
