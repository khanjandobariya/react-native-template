import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {type ColorType, OPACITY} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType, isSecondary: boolean) => {
  const {hs, vs, ms} = RS

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.white,
      borderWidth: isSecondary ? 0 : 1,
      borderColor: isSecondary ? `${colors.white}${OPACITY[20]}` : colors.borderColor,
      borderRadius: ms(50),
      paddingHorizontal: hs(20),
      height: vs(60),
      marginVertical: vs(10),
      columnGap: hs(10)
    },
    text: {
      flex: 1,
      color: isSecondary ? colors.white : colors.black
    },
    iconLeft: {
      marginRight: hs(12)
    },
    iconRight: {
      marginLeft: hs(10)
    },
    label: {
      marginBottom: vs(5),
      marginLeft: hs(5),
      color: isSecondary ? colors.white : colors.black
    }
  })
}
