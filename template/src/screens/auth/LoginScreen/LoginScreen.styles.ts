import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'
import {OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: hs(15)
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bannerContainer: {
      width: '100%',
      height: vs(300),
      marginVertical: vs(60)
    },
    banner: {
      width: '100%',
      height: '100%'
    },
    welcomeText: {
      fontSize: ms(34),
      fontFamily: FONTS.regular,
      color: colors.white,
      marginTop: vs(15),
      textAlign: 'center'
    },
    subtitleText: {
      fontSize: ms(18),
      fontFamily: FONTS.bold,
      color: colors.white,
      textAlign: 'center',
      marginTop: vs(5)
    },
    inputContainer: {
      gap: vs(10)
    },
    textInputContainer: {},
    textInputStyle: {},
    forgotPasswordContainer: {
      alignSelf: 'center',
      marginTop: vs(40)
    },
    forgotPasswordText: {
      fontSize: ms(14),
      fontFamily: FONTS.bold,
      color: colors.white,
      textDecorationLine: 'underline'
    },
    loginButton: {
      marginTop: vs(25),
      backgroundColor: colors.white,
      height: vs(55),
      borderRadius: ms(30)
    },
    loginButtonText: {
      color: colors.black,
      fontFamily: FONTS.extraBold,
      fontSize: ms(14)
    },
    getInTouchSection: {
      width: '100%',
      height: vs(64),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: `${colors.white}${OPACITY[20]}`,
      paddingVertical: vs(10),
      paddingHorizontal: hs(15),
      borderRadius: ms(40),
      marginTop: 'auto',
      marginBottom: vs(20)
    },
    getInTouchLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      columnGap: hs(10)
    },
    infoIcon: {
      width: ms(20),
      height: ms(20),
      marginRight: hs(12),
      tintColor: colors.white
    },
    getInTouchText: {
      fontSize: ms(13),
      fontFamily: FONTS.medium,
      color: colors.white,
      flex: 1,
      lineHeight: ms(18)
    },
    getInTouchBtn: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.green,
      paddingHorizontal: hs(15),
      paddingVertical: vs(10),
      borderRadius: ms(50),
      borderWidth: 1,
      borderColor: colors.white,
      marginLeft: hs(10)
    },
    getInTouchBtnText: {
      fontSize: ms(12),
      fontFamily: FONTS.extraBold,
      color: colors.white
    }
  })
}
