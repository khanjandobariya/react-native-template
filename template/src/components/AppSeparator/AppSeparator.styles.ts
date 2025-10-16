import {StyleSheet} from 'react-native'

import {type ColorType} from '@/theme/Theme'

import type {RSType} from '../../hooks/useResponsiveHook'

export const myStyles = (colors: ColorType, RS: RSType, isHorizontal: boolean, size: number) => {
  const {vs, hs} = RS
  return StyleSheet.create({
    separator: {
      width: !isHorizontal ? '100%' : hs(size),
      height: !isHorizontal ? vs(size) : '100%'
    }
  })
}
