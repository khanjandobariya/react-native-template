import {useContext} from 'react'

import {ThemeContext} from '@/theme/ThemeProvider/ThemeContext'
import type {anyType} from '@/types/commonTypes'

const useTheme = () => {
  const context: anyType = useContext(ThemeContext)
  const isDarkMode: boolean = context?.theme === 0
  return {isDarkMode}
}

export default useTheme
