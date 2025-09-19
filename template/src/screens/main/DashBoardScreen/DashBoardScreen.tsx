import React from 'react'
import {Text, View} from 'react-native'

import {AppContainer} from '@/components'
import useColor from '@/hooks/useColor'
import type {ColorType} from '@/theme/Theme'

import {myStyles} from './DashBoardScreen.style'

const DashBoardScreen = () => {
  const colors: ColorType = useColor()
  const styles: any = myStyles(colors)

  return (
    <AppContainer>
      <View style={styles.container}>
        <Text>{'DashBoardScreen'}</Text>
      </View>
    </AppContainer>
  )
}

export default DashBoardScreen
