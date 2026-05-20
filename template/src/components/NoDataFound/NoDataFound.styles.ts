import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: hs(40)
    },
    image: {
      width: ms(250),
      height: ms(200),
      marginBottom: vs(30)
    },
    title: {
      color: colors.black,
      textAlign: 'center',
      marginBottom: vs(10)
    },
    description: {
      color: colors.black,
      textAlign: 'center'
    }
  })
}
