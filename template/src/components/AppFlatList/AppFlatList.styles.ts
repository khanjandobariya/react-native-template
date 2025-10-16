import {StyleSheet} from 'react-native'

import {type ColorType} from '@/theme/Theme'
import CommonStyles from '@/utils/CommonStyles'

import type {RSType} from '../../hooks/useResponsiveHook'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {vs, hs} = RS
  return StyleSheet.create({
    endOfFeed: {
      paddingVertical: vs(15),
      alignItems: 'center'
    },
    feedsListContainer: {
      paddingVertical: vs(10)
    },
    loadButton: {
      height: vs(38),
      backgroundColor: colors.accent,
      paddingHorizontal: hs(15),
      ...CommonStyles.centerItem,
      borderRadius: hs(10),
      flexDirection: 'row',
      columnGap: hs(0)
    }
  })
}
