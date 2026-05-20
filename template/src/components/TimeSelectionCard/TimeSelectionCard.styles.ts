import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card_bg,
      borderRadius: ms(25),
      paddingHorizontal: hs(20),
      paddingVertical: vs(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: vs(15)
    },
    label: {
      fontSize: ms(16),
      fontFamily: FONTS.medium,
      color: colors.card_text,
      flex: 1
    },
    timeBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.grayShadeB3,
      borderRadius: ms(15),
      paddingHorizontal: hs(15),
      paddingVertical: vs(10),
      columnGap: hs(8),
      minWidth: hs(100),
      justifyContent: 'space-between'
    },
    timeTextContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      columnGap: hs(2)
    },
    timeText: {
      fontSize: ms(14),
      fontFamily: FONTS.bold,
      color: colors.card_text
    },
    pmText: {
      fontSize: ms(10),
      fontFamily: FONTS.bold,
      color: colors.card_text,
      textTransform: 'uppercase'
    },
    icon: {
      width: ms(12),
      height: ms(12),
      tintColor: colors.card_text
    }
  })
}
