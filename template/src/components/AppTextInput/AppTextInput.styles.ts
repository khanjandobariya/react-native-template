import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType, isSecondry: boolean) => {
  const {hs, vs, ms} = RS

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isSecondry ? `${colors.white}${OPACITY[20]}` : colors.white,
      borderWidth: 1,
      borderColor: isSecondry ? `${colors.white}${OPACITY[20]}` : colors.borderColor,
      borderRadius: ms(50),
      paddingHorizontal: hs(20),
      height: vs(60)
    },
    secondary: {
      backgroundColor: `${colors.white}${OPACITY[20]}`,
      borderColor: `${colors.white}${OPACITY[20]}`
    },
    input: {
      flex: 1,
      fontSize: ms(14),
      fontFamily: FONTS.regular,
      color: isSecondry ? colors.white : colors.black,
      paddingVertical: 0 // Remove default padding on Android
    },
    iconLeft: {
      marginRight: hs(12),
      width: ms(20),
      height: ms(20),
      resizeMode: 'contain'
    },
    iconRight: {
      marginLeft: hs(12),
      width: ms(22),
      height: ms(22),
      resizeMode: 'contain',
      tintColor: colors.black
    },
    eyeButton: {
      padding: ms(5)
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
