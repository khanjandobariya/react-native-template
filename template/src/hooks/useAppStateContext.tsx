import React, {createContext, useContext, useState} from 'react'

interface AppStateContextProps {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const AppStateContext = createContext<AppStateContextProps>({
  isLoading: false,
  setIsLoading: () => {}
})

interface AppStateContextProviderProps {
  children: React.ReactNode
}
export const AppStateContextProvider = ({children}: AppStateContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppStateContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </AppStateContext.Provider>
  )
}

export default () => useContext(AppStateContext)
