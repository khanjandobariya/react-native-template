import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import * as View from '@/screens'
import {Screen} from '@/utils'

const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.LoginScreen} component={View.LoginScreen} />
      <Stack.Screen name={Screen.DashBoardScreen} component={View.DashBoardScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation
