import React from 'react'
import {Text, View} from 'react-native'

import {myStyles} from './LoginScreen.style'
import {AppContainer} from '@/components'
import useColor from '@/hooks/useColor'

const LoginScreen = () => {
  const colors = useColor()
  const styles = myStyles(colors)

  return (
    <AppContainer>
      <View style={styles.container}>
        <Text>{'LoginScreen'}</Text>
      </View>
    </AppContainer>
  )
}

export default LoginScreen
