import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms, vs, hs, isTab} = RS
  return StyleSheet.create({
    inputContainer: {
      height: vs(50),
      paddingHorizontal: hs(10),
      paddingVertical: vs(5),
      borderRadius: ms(8),
      borderWidth: ms(isTab ? 0.5 : 1),
      backgroundColor: colors.whiteLightF9,
      borderColor: colors.greyCF,
      flexDirection: 'row',
      gap: hs(10)
    },
    inputStyle: {
      flex: 1,
      fontSize: ms(14),
      fontFamily: FONTS.regular,
      padding: 0,
      margin: 0,
      color: colors.black00
    },
    iconStyle: {
      alignSelf: 'center'
    }
  })
}
