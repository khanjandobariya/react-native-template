import type {ReactNode} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'

export type AppCardProps = {
  children: ReactNode
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
}
