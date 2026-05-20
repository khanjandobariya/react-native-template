import type {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native'

type AppTextAreaInputProps = TextInputProps & {
  errorMessage?: string
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  leftIcon?: ImageSourcePropType
  mode?: 'primary' | 'secondary'
}

export type {AppTextAreaInputProps}
