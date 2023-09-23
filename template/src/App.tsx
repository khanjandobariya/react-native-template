import React from 'react'
import {RootSiblingParent} from 'react-native-root-siblings'
import {NavigationContainer} from '@react-navigation/native'

import './i18n/i18n'
import {AppLoader} from './components'
import {AppStateContextProvider} from './hooks/useAppStateContext'
import {AppNavigation} from './router'
import {ThemeProvider} from './theme/ThemeProvider/ThemeProvider'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AppStateContextProvider>
          <RootSiblingParent>
            <AppNavigation />
            <AppLoader />
          </RootSiblingParent>
        </AppStateContextProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
