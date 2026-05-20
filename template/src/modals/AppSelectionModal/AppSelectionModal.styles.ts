import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    modal: {
      margin: 0,
      padding: 0
    },
    modalOverlay: {
      width: '90%',
      maxHeight: '60%',
      paddingVertical: vs(10),
      paddingHorizontal: hs(15),
      backgroundColor: colors.accentWhite,
      alignSelf: 'center',
      borderRadius: ms(15)
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: vs(15)
    },
    itemText: {
      color: colors.black
    },
    notch: {
      width: ms(40),
      height: vs(5),
      backgroundColor: colors.grayShade32,
      borderRadius: ms(10),
      alignSelf: 'center'
    }
  })
}
