import * as React from 'react'

import type {anyType} from '../types/commonTypes'

export const navigationRef: anyType = React.createRef()

export const onNavigate: anyType = (name: string, params: anyType) => {
  navigationRef.current.navigate(name, params)
}
