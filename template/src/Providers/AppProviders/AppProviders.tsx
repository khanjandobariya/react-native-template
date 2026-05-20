import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {navigationRef} from '@/router/RootNavigator'
import {ThemeProvider} from '@/theme/ThemeProvider/ThemeProvider'

const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <NavigationContainer ref={navigationRef}>
            <ThemeProvider>{children}</ThemeProvider>
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default AppProviders
