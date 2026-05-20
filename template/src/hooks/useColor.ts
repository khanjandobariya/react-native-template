import {useContext} from 'react'
import {useMMKVObject} from 'react-native-mmkv'

import {type ColorType, THEME} from '@/theme/Theme'
import {ThemeContext} from '@/theme/ThemeProvider/ThemeContext'
import type {anyType} from '@/types/commonTypes'
import {Const} from '@/utils/Const/Const'
import {storage} from '@/utils/Storage'
import {StorageKey} from '@/utils/StorageKey'

type SelectedThemeType = 'DefaultTheme' | 'DarkTheme'

const useColor = (): ColorType => {
  const context: anyType = useContext(ThemeContext)
  const [userDetails] = useMMKVObject<anyType>(StorageKey.USER_DETAILS, storage)
  const [theme] = useMMKVObject<anyType>(StorageKey.THEME, storage)

  const selectedTheme: SelectedThemeType = context.theme === 1 ? 'DefaultTheme' : 'DarkTheme'
  const COLOR: ColorType = THEME[selectedTheme as keyof typeof THEME]

  if (userDetails) {
    return {...COLOR, ...(theme ?? Const.THEME)}
  }

  return COLOR
}

export default useColor
