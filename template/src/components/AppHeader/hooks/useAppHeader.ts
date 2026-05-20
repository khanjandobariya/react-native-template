import {useNavigation} from '@react-navigation/native'

import type {anyType} from '@/types/commonTypes'

const useAppHeader = () => {
  const navigation: anyType = useNavigation()

  const onBackPress = () => {
    navigation.goBack()
  }

  const onDrawerPress = () => {
    navigation?.toggleDrawer()
  }

  return {onBackPress, onDrawerPress}
}

export default useAppHeader
