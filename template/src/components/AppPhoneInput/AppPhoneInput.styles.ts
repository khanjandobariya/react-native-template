import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType, isSecondary: boolean) => {
  const {hs, vs, ms} = RS

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.white,
      borderWidth: 1,
      borderColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.borderColor,
      borderRadius: ms(50),
      paddingHorizontal: hs(20),
      height: vs(60)
    },
    input: {
      flex: 1,
      fontSize: ms(16),
      fontFamily: FONTS.regular,
      color: isSecondary ? colors.white : colors.black,
      paddingVertical: 0
    },
    iconLeft: {
      marginRight: hs(10),
      width: ms(20),
      height: ms(20),
      resizeMode: 'contain'
    },
    countryPickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: hs(10)
    },
    countryTextStyle: {
      fontSize: ms(16),
      fontFamily: FONTS.regular,
      color: isSecondary ? colors.white : colors.black,
      marginRight: hs(4)
    },
    dropdownIcon: {
      width: ms(10),
      height: ms(10),
      resizeMode: 'contain'
    },
    verticalLine: {
      width: 1,
      height: vs(30),
      backgroundColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.borderColor,
      marginHorizontal: hs(12)
    },
    label: {
      fontSize: ms(14),
      fontFamily: FONTS.regular,
      color: isSecondary ? colors.white : colors.black,
      marginBottom: vs(5),
      marginLeft: hs(5)
    },
    error: {
      fontSize: ms(12),
      fontFamily: FONTS.regular,
      color: colors.red,
      marginTop: vs(5),
      marginLeft: hs(5)
    }
  })
}
