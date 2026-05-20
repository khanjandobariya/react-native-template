import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: hs(15),
      paddingVertical: vs(10)
    },
    backButton: {
      height: ms(45),
      width: ms(45),
      borderRadius: ms(300),
      backgroundColor: colors.greenShade,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bannerContainer: {
      flex: 1,
      alignItems: 'flex-end'
    },
    banner: {
      height: vs(60),
      width: hs(248)
    }
  })
}
