import React, {useCallback, useEffect, useMemo, useState} from 'react'
import type {ColorSchemeName} from 'react-native'
import {useColorScheme} from 'react-native'

import type {anyType} from '../../types/commonTypes'
import {ThemeContext} from './ThemeContext'

type ChangeThemType = () => void

// eslint-disable-next-line custom-rules/function-naming-conventions
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(1)
  const systemTheme: ColorSchemeName = useColorScheme()

  const changeTheme: ChangeThemType = useCallback(() => {
    const themeCode: 0 | 1 = theme === 0 ? 1 : 0
    setTheme(themeCode)
  }, [theme])

  const value: anyType = useMemo(() => {
    return {theme, changeTheme}
  }, [changeTheme, theme])

  useEffect(() => {
    setTheme(systemTheme === 'dark' ? 0 : 1)
  }, [systemTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
