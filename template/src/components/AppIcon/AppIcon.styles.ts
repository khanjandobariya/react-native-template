import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType, disabled: boolean) => {
  const {ms, hs} = RS
  return StyleSheet.create({
    imageView: {
      width: ms(24),
      height: ms(24),
      zIndex: 100,
      padding: !disabled ? hs(2) : 0
    },
    image: {
      width: '100%',
      height: '100%'
    }
  })
}
