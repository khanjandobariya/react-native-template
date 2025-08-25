import {Platform, View} from 'react-native'
import React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useColor} from '@/hooks'

function AppEdgedProvider({children}: {children: React.ReactNode}) {
  const insets = useSafeAreaInsets()
  const colors = useColor()
  const topInset = Platform.OS === 'android' && insets?.top > 0 ? Math.max(insets?.top, 8) : 0
  const bottomInset =
    Platform.OS === 'android' && insets?.bottom > 0 ? Math.max(insets?.bottom, 8) : 0
  const style = Platform.OS === 'android' ? {paddingTop: topInset, paddingBottom: bottomInset} : {}

  return <View style={[{flex: 1, backgroundColor: colors.background}, style]}>{children}</View>
}

export default AppEdgedProvider
