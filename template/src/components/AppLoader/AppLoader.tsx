import {ActivityIndicator, StyleSheet, View} from 'react-native'

import {useAppStateContext, useResponsiveHook} from '@/hooks'
import useColor from '@/hooks/useColor'
import {type ColorType, OPACITY} from '@/theme/Theme'

import type {RSType} from '../../hooks/useResponsiveHook'

const AppLoader = () => {
  const {isLoading} = useAppStateContext()
  const RS = useResponsiveHook()
  const colors: ColorType = useColor()
  const styles: any = myStyles(colors, RS)

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator color={colors.background} size={'large'} />
        </View>
      </View>
    )
  }
  return null
}

export default AppLoader

const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs} = RS
  return StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${colors.modalOverlay}${OPACITY[50]}`
    },
    innerContainer: {
      width: hs(100),
      height: hs(100),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 20,
      shadowColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7
    }
  })
}
