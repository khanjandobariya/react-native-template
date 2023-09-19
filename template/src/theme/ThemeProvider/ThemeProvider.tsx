import React, {useCallback, useMemo, useState} from 'react'

import {ThemeContext} from './ThemeContext'

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(0)

  const changeTheme = useCallback(() => {
    const themeCode = theme === 0 ? 1 : 0
    setTheme(themeCode)
  }, [theme])

  const value = useMemo(() => {
    return {theme, changeTheme}
  }, [changeTheme, theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
