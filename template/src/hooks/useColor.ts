import {useContext} from 'react'

import {type ColorType, THEME} from '@/theme/Theme'
import {ThemeContext} from '@/theme/ThemeProvider/ThemeContext'
import type {anyType} from '@/types/commonTypes'

type SelectedThemeType = 'DefaultTheme' | 'DarkTheme'

const useColor = (): ColorType => {
  const context: anyType = useContext(ThemeContext)
  const selectedTheme: SelectedThemeType = context.theme === 1 ? 'DefaultTheme' : 'DarkTheme'
  const color: ColorType = THEME[selectedTheme as keyof typeof THEME]
  return color
}

export default useColor
