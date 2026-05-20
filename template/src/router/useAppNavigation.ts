import {Screen} from '@/utils'

const useAppNavigation = () => {
  const getInitialRoute: () => string = () => {
    return Screen.AuthNavigation
  }

  const initialRoute: string = getInitialRoute()

  return {initialRoute}
}

export default useAppNavigation
