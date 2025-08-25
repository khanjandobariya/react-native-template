import {View, Text} from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {ThemeProvider} from '../../theme/ThemeProvider/ThemeProvider'
import {AppStateContextProvider} from '@/hooks/useAppStateContext'
import {RootSiblingParent} from 'react-native-root-siblings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppEdgedProvider from '../AppEdgedProvider/AppEdgedProvider'

// declare your providers here
const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppEdgedProvider>
            <AppStateContextProvider>
              <RootSiblingParent>{children}</RootSiblingParent>
            </AppStateContextProvider>
          </AppEdgedProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default AppProviders
