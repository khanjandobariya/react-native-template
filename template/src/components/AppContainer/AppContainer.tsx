import {useIsFocused} from '@react-navigation/native'
import {includes} from 'lodash'
import {useEffect} from 'react'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {useCommonHooks} from '@/hooks'
import useStatusBar from '@/hooks/useStatusBar'

import {myStyles} from './AppContainer.styles'
import type {AppContainerProps} from './types/AppContainer.types'

const AppContainer = (props: AppContainerProps) => {
  const {children, style, edges = ['top', 'bottom'], topSafeAreaColor, bottomSafeAreaColor} = props
  const {colors} = useCommonHooks()
  const styles = myStyles(colors)
  const isTopSafeArea = includes(edges, 'top')
  const isBottomSafeArea = includes(edges, 'bottom')
  const isFocused = useIsFocused()
  const {setStatusBar} = useStatusBar()

  useEffect(() => {
    if (!isFocused) return
    setStatusBar('dark-content', colors.transparent)
  }, [isFocused])

  return (
    <View style={styles.mainContainer}>
      {isTopSafeArea && (
        <SafeAreaView edges={['top']} style={{backgroundColor: topSafeAreaColor ?? colors.white}} />
      )}
      <View style={[styles.container, style]}>{children}</View>
      {isBottomSafeArea && (
        <SafeAreaView
          edges={['bottom']}
          style={{backgroundColor: bottomSafeAreaColor ?? colors.white}}
        />
      )}
    </View>
  )
}

export default AppContainer
