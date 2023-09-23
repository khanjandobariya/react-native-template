import {useContext} from 'react'

import {type ColorType, Theme} from '@/theme/Theme'
import {ThemeContext} from '@/theme/ThemeProvider/ThemeContext'

const useColor = () => {
  const context = useContext(ThemeContext)
  const selectedTheme = context.theme === 0 ? 'DefaultTheme' : 'DarkTheme'
  const color: ColorType = Theme[selectedTheme]
  return color
}

export default useColor
