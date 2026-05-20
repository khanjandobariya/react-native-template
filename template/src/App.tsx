import './i18n/i18n'

import React, {useEffect} from 'react'
import BootSplash from 'react-native-bootsplash'

import {AppProviders} from './Providers'
import {AppNavigation} from './router'

const App: React.FC = () => {
  useEffect(() => {
    BootSplash.hide({fade: true})
  }, [])

  return (
    <AppProviders>
      <AppNavigation />
    </AppProviders>
  )
}

export default App
