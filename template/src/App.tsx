import React from 'react'

import './i18n/i18n'
import {AppAuthentication, AppProviders} from './components'
import {AppNavigation} from './router'

const App = () => {
  return (
    <AppProviders>
      <AppAuthentication>
        <AppNavigation />
      </AppAuthentication>
    </AppProviders>
  )
}

export default App
