import React, {createContext, useContext, useState} from 'react'

type AppStateContextProps = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const AppStateContext = createContext<AppStateContextProps>({
  isLoading: false,
  setIsLoading: () => {}
})

type AppStateContextProviderProps = {
  children: React.ReactNode
}
// eslint-disable-next-line custom-rules/function-naming-conventions
export const AppStateContextProvider = ({children}: AppStateContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppStateContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </AppStateContext.Provider>
  )
}

export default () => useContext(AppStateContext)
