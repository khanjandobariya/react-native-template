import React, {useCallback, useMemo, useState} from 'react'

import type {anyType} from '../../types/commonTypes'
import {ThemeContext} from './ThemeContext'

type ChangeThemType = () => void

// eslint-disable-next-line custom-rules/function-naming-conventions
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(1)

  const changeTheme: ChangeThemType = useCallback(() => {
    const themeCode: 0 | 1 = theme === 0 ? 1 : 0
    setTheme(themeCode)
  }, [theme])

  const value: anyType = useMemo(() => {
    return {theme, changeTheme}
  }, [changeTheme, theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
