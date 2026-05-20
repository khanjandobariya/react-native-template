import type {ColorValue} from 'react-native'
import {InteractionManager, StatusBar} from 'react-native'

import useCommonHooks from './useCommonHooks'

const useStatusBar = () => {
  const {colors} = useCommonHooks()
  const setStatusBar = (
    barStyle: 'light-content' | 'dark-content',
    backgroundColor = colors.transparent
  ) => {
    InteractionManager.runAfterInteractions(() => {
      StatusBar.setBarStyle(barStyle, true)
      StatusBar.setBackgroundColor(backgroundColor as ColorValue, false)
    })
  }

  return {setStatusBar}
}

export default useStatusBar
