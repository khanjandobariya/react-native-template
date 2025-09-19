import {StyleSheet} from 'react-native'

import {type ColorType} from '@/theme/Theme'
import CommonStyles from '@/utils/CommonStyles'
import {scale, verticalScale} from '@/utils/Responsive'

export const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    endOfFeed: {
      paddingVertical: verticalScale(15),
      alignItems: 'center'
    },
    feedsListContainer: {
      paddingVertical: verticalScale(10)
    },
    loadButton: {
      height: verticalScale(38),
      backgroundColor: colors.accent,
      paddingHorizontal: scale(15),
      ...CommonStyles.centerItem,
      borderRadius: scale(10),
      flexDirection: 'row',
      columnGap: scale(0)
    }
  })
}
