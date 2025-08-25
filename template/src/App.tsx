import React from 'react'

import './i18n/i18n'
import {AppLoader} from './components'
import {AppNavigation} from './router'
import {AppProviders} from './Providers'

const App = () => {
  return (
    <AppProviders>
      <AppNavigation />
      <AppLoader />
    </AppProviders>
  )
}

export default App
