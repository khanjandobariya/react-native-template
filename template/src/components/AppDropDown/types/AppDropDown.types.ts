import type {ImageSourcePropType, StyleProp, TextStyle, ViewStyle} from 'react-native'

export type AppDropDownProps = {
  label?: string
  text?: string
  errorMessage?: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  leftIcon?: ImageSourcePropType
  mode?: 'primary' | 'secondary'
  onPress?: () => void
}
