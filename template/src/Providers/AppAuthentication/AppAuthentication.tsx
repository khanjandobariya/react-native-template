import React from 'react'
import {View} from 'react-native'

import AppLoader from '@/components/AppLoader/AppLoader'

import type {anyType} from '../../types/commonTypes'
import {myStyles} from './AppAuthentication.style'

// declare your authentication logic here
const AppAuthentication = ({children}: anyType) => {
  // const colors: ColorType = useColor()
  const styles = myStyles()

  return (
    <View style={styles.container}>
      {children}
      <AppLoader />
    </View>
  )
}

export default AppAuthentication
