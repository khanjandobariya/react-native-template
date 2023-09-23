import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native'

import useColor from '@/hooks/useColor'
import {type ColorType} from '@/theme/Theme'

interface AppContainerProps {
  isTopSafeArea: boolean
  isBottomSafeArea: boolean
  bottomColor: string
  children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  const {isTopSafeArea, isBottomSafeArea, bottomColor, children} = props
  const colors = useColor()
  const TopComponent = isTopSafeArea ? SafeAreaView : View
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View
  const styles = myStyles(colors)

  return (
    <View style={styles.container}>
      <TopComponent style={{backgroundColor: colors.background}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.statusBar} />
      <View style={styles.mainContainer}>{children}</View>
      <BottomComponent style={{backgroundColor: bottomColor}} />
    </View>
  )
}

export default AppContainer

const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    mainContainer: {
      flex: 1
    }
  })
}

AppContainer.defaultProps = {
  bottomColor: {},
  isTopSafeArea: true,
  isBottomSafeArea: true
}
