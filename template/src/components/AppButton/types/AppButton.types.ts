import type {StyleProp, TextStyle, ViewStyle} from 'react-native'

type AppButtonMode = 'primary' | 'secondary'

type AppButtonProps = {
  title: string
  onPress?: () => void
  mode?: AppButtonMode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
}

export type {AppButtonMode, AppButtonProps}
