import {Platform, StyleSheet, View} from 'react-native'
import {type EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'
import type {anyType} from '@/types/commonTypes'

const AppEdgedProvider = ({children}: anyType) => {
  const insets: EdgeInsets = useSafeAreaInsets()
  const colors: ColorType = useColor()
  const styles: any = myStyles(colors)
  const topInset: number =
    Platform.OS === 'android' && insets?.top > 0 ? Math.max(insets?.top, 8) : 0
  const bottomInset: number =
    Platform.OS === 'android' && insets?.bottom > 0 ? Math.max(insets?.bottom, 8) : 0
  const style: anyType =
    Platform.OS === 'android' ? {paddingTop: topInset, paddingBottom: bottomInset} : {}

  return <View style={[styles.container, style]}>{children}</View>
}

export default AppEdgedProvider

const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    }
  })
}
