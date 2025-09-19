import {createStackNavigator} from '@react-navigation/stack'

import * as View from '@/screens'
import {Screen} from '@/utils'

const Stack = createStackNavigator()

const AppAuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.LoginScreen} component={View.LoginScreen} />
    </Stack.Navigator>
  )
}

export default AppAuthNavigation
