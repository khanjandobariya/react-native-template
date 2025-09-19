import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms, hs, vs} = RS
  return StyleSheet.create({
    container: {
      flex: 1
    },
    rememberContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: vs(4)
    },
    checkbox: {
      width: ms(18),
      height: ms(18),
      marginRight: hs(8)
    },
    rememberMeText: {
      color: colors.black78
    },
    loginText: {
      color: colors.black78,
      textAlign: 'center'
    },
    forgotPasswordText: {
      color: colors.accent
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottomText: {
      color: colors.black78
    },
    bottomInnerText: {
      color: colors.accent,
      textDecorationLine: 'underline',
      textDecorationColor: colors.accent
    },
    title: {
      marginTop: vs(120),
      marginBottom: vs(50),
      fontSize: ms(34),
      color: colors.blueDark00,
      fontFamily: FONTS.heavy,
      lineHeight: ms(38),
      zIndex: 2
    }
  })
}
