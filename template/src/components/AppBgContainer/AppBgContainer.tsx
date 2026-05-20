import {useIsFocused} from '@react-navigation/native'
import {useEffect} from 'react'
import {ImageBackground} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {useCommonHooks} from '@/hooks'
import useStatusBar from '@/hooks/useStatusBar'
import {Images} from '@/utils'

import {myStyles} from './AppBgContainer.styles'
import type {AppBGContainerProps} from './types/AppBgContainer.types'

const AppBGContainer = (props: AppBGContainerProps) => {
  const {children, edges = ['top', 'bottom']} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const isFocused = useIsFocused()
  const {setStatusBar} = useStatusBar()

  useEffect(() => {
    if (!isFocused) return
    setStatusBar('light-content', colors.transparent)
  }, [isFocused])

  return (
    <ImageBackground source={Images.bg_image} style={styles.mainContainer}>
      <SafeAreaView edges={edges} style={styles.container}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default AppBGContainer
