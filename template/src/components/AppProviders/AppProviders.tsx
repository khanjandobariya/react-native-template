import {View, Text} from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {ThemeProvider} from '../../theme/ThemeProvider/ThemeProvider'
import {AppStateContextProvider} from '@/hooks/useAppStateContext'
import {RootSiblingParent} from 'react-native-root-siblings'

// declare your providers here
const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AppStateContextProvider>
          <RootSiblingParent>{children}</RootSiblingParent>
        </AppStateContextProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default AppProviders
