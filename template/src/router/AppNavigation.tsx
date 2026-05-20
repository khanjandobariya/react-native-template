import {createStackNavigator} from '@react-navigation/stack'

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- `View` is injected by the Plop screen generator
import * as View from '@/screens'
import {Screen} from '@/utils'

import AppAuthNavigation from './AuthNavigation'
import MainStack from './MainNavigation'

const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Screen.AuthNavigation}>
      <Stack.Screen name={Screen.AuthNavigation} component={AppAuthNavigation} />
      <Stack.Screen name={Screen.MainStack} component={MainStack} />
      {/* PLOP SCREEN STACK */}
    </Stack.Navigator>
  )
}

export default AppNavigation
