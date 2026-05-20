import type React from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import type {Edges} from 'react-native-safe-area-context'

type AppContainerProps = {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  edges?: Edges
  topSafeAreaColor?: string
  bottomSafeAreaColor?: string
}

export type {AppContainerProps}
