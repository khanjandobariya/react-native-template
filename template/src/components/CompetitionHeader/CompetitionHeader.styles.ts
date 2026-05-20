import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    bannerCard: {
      backgroundColor: `${colors.card_bg}${OPACITY[20]}`,
      borderWidth: 0,
      borderRadius: ms(20),
      height: vs(120),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: vs(30)
    },
    logo: {
      width: '80%',
      height: '80%',
      tintColor: colors.white
    },
    competitionCard: {
      backgroundColor: `${colors.card_bg}${OPACITY[20]}`,
      borderWidth: 0,
      borderRadius: ms(20),
      flexDirection: 'row',
      alignItems: 'center',
      padding: ms(15),
      marginBottom: vs(20),
      columnGap: hs(15)
    },
    compImageContainer: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center'
    },
    compImage: {
      width: '100%',
      height: '100%'
    },
    compTitle: {
      color: colors.Info_text,
      fontSize: ms(16),
      fontFamily: FONTS.semiBold
    }
  })
}
