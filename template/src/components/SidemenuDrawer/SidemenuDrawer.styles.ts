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
      backgroundColor: colors.bgColor
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: hs(20),
      paddingTop: vs(20),
      marginBottom: vs(30)
    },
    logo: {
      width: ms(120),
      height: vs(40)
    },
    closeButton: {
      backgroundColor: `${colors.green}${OPACITY[10]}`,
      padding: ms(10),
      borderRadius: ms(25)
    },
    crossIconStyle: {
      width: '70%',
      height: '70%'
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: hs(20)
    },
    itemContainer: {
      paddingVertical: vs(15),
      borderBottomWidth: 1,
      borderBottomColor: colors.deviderColor
    },
    itemText: {
      fontSize: ms(16),
      fontFamily: FONTS.medium,
      color: colors.black
    },
    footer: {
      paddingHorizontal: hs(20),
      paddingBottom: vs(30),
      alignItems: 'center'
    },
    versionText: {
      fontSize: ms(12),
      color: colors.lightBlue,
      marginBottom: vs(40)
    },
    logoutContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    logoutText: {
      fontSize: ms(18),
      color: colors.green,
      marginLeft: hs(10),
      textDecorationLine: 'underline'
    }
  })
}
