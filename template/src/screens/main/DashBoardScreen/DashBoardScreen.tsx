import React from 'react'
import {Text, View} from 'react-native'

import {myStyles} from './DashBoardScreen.style'
import {AppContainer} from '@/components'
import useColor from '@/hooks/useColor'

const DashBoardScreen = () => {
  const colors = useColor()
  const styles = myStyles(colors)

  return (
    <AppContainer>
      <View style={styles.container}>
        <Text>{'DashBoardScreen'}</Text>
      </View>
    </AppContainer>
  )
}

export default DashBoardScreen
