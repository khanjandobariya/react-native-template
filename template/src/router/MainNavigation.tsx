import {createDrawerNavigator, type DrawerContentComponentProps} from '@react-navigation/drawer'
import React from 'react'

import {SidemenuDrawer} from '@/components'
import * as View from '@/screens'
import {Screen} from '@/utils'

const Drawer = createDrawerNavigator()

const MainStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={(props: DrawerContentComponentProps) => <SidemenuDrawer {...props} />}
    >
      <Drawer.Screen name={Screen.HomeScreen} component={View.HomeScreen} />
    </Drawer.Navigator>
  )
}

export default MainStack
