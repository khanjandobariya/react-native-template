import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      flex: 1
    },
    innerContainer: {
      backgroundColor: colors.darkBlue,
      flex: 1,
      paddingHorizontal: hs(20),
      paddingTop: vs(20)
    },
    bannerCard: {
      backgroundColor: `${colors.card_bg}${OPACITY[20]}`,
      borderWidth: 0,
      borderRadius: ms(20),
      height: vs(120),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: vs(30),
      padding: ms(20)
    },
    logo: {
      width: '80%',
      height: '80%',
      tintColor: colors.white
    },
    title: {
      color: colors.Info_text,
      fontSize: ms(22),
      marginBottom: vs(10)
    },
    listContent: {
      paddingBottom: vs(20)
    },
    columnWrapper: {
      columnGap: hs(15)
    },
    itemCard: {
      backgroundColor: `${colors.card_bg}${OPACITY[20]}`,
      borderWidth: 0,
      borderRadius: ms(20),
      flex: 1,
      padding: ms(10)
    },
    itemImageContainer: {
      width: ms(80),
      height: ms(80),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: vs(10),
      backgroundColor: colors.clouser_bg,
      borderRadius: ms(300),
      alignSelf: 'center'
    },
    itemImage: {
      width: '60%',
      height: '60%'
    },
    itemTitle: {
      color: colors.Info_text,
      fontSize: ms(16),
      fontFamily: FONTS.semiBold,
      textAlign: 'center'
    }
  })
}
