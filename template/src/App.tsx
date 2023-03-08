import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import './i18n/i18n'
import {ThemeProvider} from './theme/ThemeProvider/ThemeProvider'
import {AppNavigation} from './router'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
