import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {RootSiblingParent} from 'react-native-root-siblings'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {AppStateContextProvider} from '@/hooks/useAppStateContext'
import CommonStyles from '@/utils/CommonStyles'

import {ThemeProvider} from '../../theme/ThemeProvider/ThemeProvider'
import AppEdgedProvider from '../AppEdgedProvider/AppEdgedProvider'

// declare your providers here
const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <GestureHandlerRootView style={CommonStyles.flex}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <NavigationContainer>
            <ThemeProvider>
              <AppEdgedProvider>
                <AppStateContextProvider>
                  <RootSiblingParent>{children}</RootSiblingParent>
                </AppStateContextProvider>
              </AppEdgedProvider>
            </ThemeProvider>
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default AppProviders
