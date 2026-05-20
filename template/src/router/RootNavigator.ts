import {CommonActions} from '@react-navigation/native'
import * as React from 'react'

import type {anyType} from '../types/commonTypes'

export const navigationRef: anyType = React.createRef()

export const onNavigate: anyType = (name: string, params: anyType) => {
  navigationRef.current?.navigate(name, params)
}

export const onPush: anyType = (name: string, params: anyType) => {
  navigationRef.current?.push(name, params)
}

export const onResetStack = (routes: anyType, index = 0) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index,
      routes
    })
  )
}
