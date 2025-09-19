import React, {useContext} from 'react'
import {Platform, SafeAreaView, StatusBar, StyleSheet, View, type ViewComponent} from 'react-native'

import useColor from '@/hooks/useColor'
import {type ColorType} from '@/theme/Theme'
import {ThemeContext} from '@/theme/ThemeProvider/ThemeContext'
import type {anyType} from '@/types/commonTypes'

type AppContainerProps = {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  bottomColor?: string
  children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  const {
    bottomColor,
    children,
    isTopSafeArea = Platform.OS === 'ios',
    isBottomSafeArea = Platform.OS === 'ios'
  } = props
  const {theme}: anyType = useContext(ThemeContext)
  const colors: ColorType = useColor()
  const isDarkMode: boolean = theme === 1

  const TopComponent: typeof SafeAreaView | typeof ViewComponent = isTopSafeArea
    ? SafeAreaView
    : View

  const BottomComponent: typeof SafeAreaView | typeof ViewComponent = isBottomSafeArea
    ? SafeAreaView
    : View
  const styles: any = myStyles(colors)

  return (
    <View style={styles.container}>
      <TopComponent style={{backgroundColor: colors.background}} />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.statusBar}
      />
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
