import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType} from '@/theme/Theme'
import CommonStyles from '@/utils/CommonStyles'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {ms, hs, vs} = RS
  return StyleSheet.create({
    buttonContainer: {
      height: vs(48), // 48px ≈ 6% of screen height on most devices
      backgroundColor: colors.accent,
      paddingHorizontal: hs(18),
      ...CommonStyles.centerItem,
      borderRadius: ms(10)
    },
    labelStyle: {
      color: colors.accentWhite
    }
  })
}
