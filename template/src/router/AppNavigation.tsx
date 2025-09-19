import {createStackNavigator} from '@react-navigation/stack'

import * as View from '@/screens'
import {Screen} from '@/utils'

import AppAuthNavigation from './AuthNavigation'

const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.LoginScreen} component={AppAuthNavigation} />
      <Stack.Screen name={Screen.DashBoardScreen} component={View.DashBoardScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation
