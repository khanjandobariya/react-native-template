import './i18n/i18n'

import React from 'react'
import {LogBox} from 'react-native'

import {AppLoader} from './components'
import {AppProviders} from './Providers'
import {AppNavigation} from './router'

LogBox.ignoreAllLogs()

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppNavigation />
      <AppLoader />
    </AppProviders>
  )
}

export default App
