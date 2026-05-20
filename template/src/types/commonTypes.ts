import type {StackNavigationProp} from '@react-navigation/stack'
import type {RefObject} from 'react'
import type {ImageSourcePropType} from 'react-native'

// eslint-disable-next-line custom-rules/no-explicit-any-except-styles
export type anyType = any

// eslint-disable-next-line custom-rules/no-explicit-any-except-styles
export type Any = any

export type ImageSourceType = ImageSourcePropType

// eslint-disable-next-line custom-rules/no-explicit-any-except-styles
export type RefType = RefObject<any>

export type NavigationType = StackNavigationProp<anyType>

export type TokensType = {
  access: string
  refresh: string
}

export type Route = Readonly<{
  key: string
  name: string
  path?: string
}> &
  Readonly<{
    params: anyType
  }>
