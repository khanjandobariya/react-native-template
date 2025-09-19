import {type StyleProp, View, type ViewStyle} from 'react-native'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import {myStyles} from './AppSeparator.styles'

type AppSeparatorProps = {
  size?: number
  isHorizontal?: boolean
  style?: StyleProp<ViewStyle>
}

const AppSeparator = ({style, isHorizontal = false, size = 10}: AppSeparatorProps) => {
  const colors: ColorType = useColor()
  const styles = myStyles(colors, isHorizontal, size)

  return <View style={[styles.separator, style]} />
}

export default AppSeparator
