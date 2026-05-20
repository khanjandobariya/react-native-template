import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType, isSecondary: boolean) => {
  const {hs, vs, ms} = RS

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.white,
      borderWidth: 1,
      borderColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.borderColor,
      borderRadius: ms(25),
      paddingHorizontal: hs(20),
      paddingTop: vs(15),
      minHeight: vs(120)
    },
    input: {
      flex: 1,
      fontSize: ms(16),
      fontFamily: FONTS.regular,
      color: isSecondary ? colors.white : colors.black,
      textAlignVertical: 'top',
      paddingTop: 0,
      paddingBottom: vs(15)
    },
    iconLeft: {
      marginRight: hs(12),
      width: ms(20),
      height: ms(20),
      resizeMode: 'contain',
      marginTop: vs(2)
    },
    label: {
      fontSize: ms(14),
      fontFamily: FONTS.regular,
      color: colors.black,
      marginBottom: vs(5),
      marginLeft: hs(5)
    }
  })
}
