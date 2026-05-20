import type {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native'

type AppTextInputProps = TextInputProps & {
  label?: string
  errorMessage?: string
  isSecureText?: boolean
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  leftIcon?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
  mode?: 'primary' | 'secondary'
}

export type {AppTextInputProps}
