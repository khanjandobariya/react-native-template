import type {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle
} from 'react-native'

type AppIconProps = {
  style?: StyleProp<ViewStyle>
  resizeMode?: ImageResizeMode
  source: ImageSourcePropType
  size?: number
  tintColor?: string
  onPress?: () => void
  disabled?: boolean
  iconStyle?: StyleProp<ImageStyle>
}

export type {AppIconProps}
