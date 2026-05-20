import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      flex: 1,
      height: vs(156)
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: vs(15),
      width: '100%',
      columnGap: hs(6)
    },
    dot: {
      width: ms(20),
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: `${colors.white}${OPACITY[20]}`
    },
    activeDot: {
      width: ms(20),
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: colors.white
    },
    carouselStyle: {
      width: '100%',
      height: '100%'
    }
  })
}
